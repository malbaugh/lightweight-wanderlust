import { useCallback, useEffect, useRef, useState, DragEvent } from "react";
import { Box, Input, Typography } from "@mui/material";
import {
  AssistantComponentSkeleton,
  ChatHistory,
  FlightPopup,
  InteractiveMap,
  PromptInput,
} from "@components";
import {
  Center,
  FlightInfo,
  Marker,
  Message,
  ToolOutput,
  Trip,
  generateAnnotation,
} from "@objects";
import axios from "axios";
import { Logger } from "@utils";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";

const isRunActive = (run: Run | null): boolean => {
  // A run is active if it is in one of the following states
  return (
    run !== null &&
    ["queued", "in_progress", "cancelling", "requires_action"].includes(
      run.status
    )
  );
};

function AssistantComponent({ threadId }: { threadId: string }) {
  // Ref to scroll to the bottom of the chat history
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  // Map state
  const [mapCenter, setMapCenter] = useState<Center>({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [pointsOfInterest, setPointsOfInterest] = useState<Marker[]>([]);
  const [mapZoomLevel, setMapZoomLevel] = useState<number>(12);
  // Chat state
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [currentRun, setCurrentRun] = useState<Run | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [assistantWriting, setAssistantWriting] = useState<boolean>(false);
  // Loading state
  const [loading, setLoading] = useState<boolean>(true);
  // Flight info state
  const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null);

  // Poll for the run status
  const pollRunStatus = useCallback(() => {
    // Poll for the run status if a run is active
    if (currentRun && isRunActive(currentRun)) {
      const timeoutId = setTimeout(() => {
        pollCurrentRunStatus();
      }, 2000);

      // Clear the timeout when the currentRun changes, component unmounts or polling stops
      return () => clearTimeout(timeoutId);
    }
  }, [currentRun]);

  // Start polling for the run status when a run is active
  useEffect(() => {
    pollRunStatus();
  }, [pollRunStatus]);

  // Scroll to the bottom of the chat history when a new message is received
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, assistantWriting, loading]);

  useEffect(() => {
    hydrateMessages();
  }, []);

  // This method takes a run and executes the required actions
  async function executeAssistantActions(run: Run): Promise<ToolOutput[]> {
    if (!run.required_action) return [];
    Logger.debug(`Executing required actions for the assistant`);

    const outputs: ToolOutput[] = [];
    const actions = run.required_action.submit_tool_outputs.tool_calls;
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      // If the action is a function, execute it
      if (action.type === "function") {
        const args = JSON.parse(action.function.arguments);
        // Handle zoom level changes
        if (action.function.name === "changeMapZoomLevel") {
          const response = changeMapZoomLevel(args.zoomLevel);
          outputs.push({
            tool_call_id: action.id,
            output: response,
          });
        }
        // Handle map center changes
        else if (action.function.name === "changeMapCenter") {
          const response = changeMapCenter(
            args.latitude,
            args.longitude,
            args.zoomLevel
          );
          outputs.push({
            tool_call_id: action.id,
            output: response,
          });
        }
        // Handle map markers being added
        else if (action.function.name === "addLocationsToMap") {
          const response = addLocationsToMap(
            args.markers,
            args.centerLatitude,
            args.centerLongitude,
            args.zoomLevel
          );
          outputs.push({
            tool_call_id: action.id,
            output: response,
          });
        } else if (action.function.name === "updateFlightInfo") {
          const response = await updateFlightInfo(
            args.inboundTrip,
            args.outboundTrip
          );
          outputs.push({
            tool_call_id: action.id,
            output: response,
          });
        }
      }
    }

    return outputs;
  }

  function changeMapZoomLevel(zoomLevel: number): string {
    Logger.debug("Setting map mapZoomLevel level");
    setMessages([...messages, generateAnnotation("Updated Map", "zoom")]);
    setMapZoomLevel(zoomLevel);
    return "Map mapZoomLevel level set successfully.";
  }

  function changeMapCenter(
    latitude: number,
    longitude: number,
    zoomLevel: number
  ): string {
    Logger.debug(`Setting map center to ${latitude}, ${longitude}`);
    setMessages([...messages, generateAnnotation("Updated Map", "center")]);
    setMapCenter({ lat: latitude, lng: longitude });
    setMapZoomLevel(zoomLevel);
    return "Map centered set successfully.";
  }

  function addLocationsToMap(
    locations: Marker[],
    latitude: number,
    longitude: number,
    zoomLevel: number
  ): string {
    Logger.debug(`Marking ${locations.length} locations`);
    setMessages([...messages, generateAnnotation("Annotated Map", "mark")]);
    setMapCenter({ lat: latitude, lng: longitude });
    setMapZoomLevel(zoomLevel);
    setPointsOfInterest(locations);
    return "Map locations marked successfully.";
  }

  async function updateFlightInfo(
    inboundTrip: Trip,
    outboundTrip: Trip
  ): Promise<string> {
    Logger.debug(`Updating flight info`);
    setFlightInfo({
      inboundTrip: inboundTrip,
      outboundTrip: outboundTrip,
    });
    setMessages([
      ...messages,
      generateAnnotation("Displaying flight information", "flight"),
    ]);
    return "Flight information displayed successfully.";
  }

  // API Calls
  const hydrateMessages = useCallback(async () => {
    Logger.debug("Hydrating");

    fetchMessages()
      .then(() => fetchOpenRun())
      .then(() => setLoading(false))
      .catch((error) => {
        Logger.error(error);
      });
  }, []);

  const fetchMessages = useCallback(async () => {
    Logger.debug("Fetching messages");
    return axios
      .get(`/api/threads/${threadId}/messages`)
      .then((response) => {
        const { newMessages }: { newMessages: Message[] | undefined } =
          response.data;
        if (newMessages) {
          const missingMessages = newMessages.filter(
            (msg) => !messages.find((m) => m.id === msg.id)
          );
          setMessages(
            [...messages, ...missingMessages].sort(
              (a: Message, b: Message) => a.created_at - b.created_at
            )
          );
        }

        setAssistantWriting(false);
      })
      .catch((error) => {
        Logger.error(error);
      });
  }, []);

  const fetchOpenRun = useCallback(async () => {
    Logger.debug("Fetching open run");
    return axios
      .get(`/api/threads/${threadId}/runs`)
      .then(async (response) => {
        const latestRun: Run | null = response.data.run;
        if (latestRun && isRunActive(latestRun)) {
          setCurrentRun(latestRun);
          if (latestRun.status === "requires_action") {
            const outputs = await executeAssistantActions(response.data.run);
            submitFunctionOutputs(outputs, response.data.run.id);
          }
        }
      })
      .catch((error) => {
        Logger.error(error);
      });
  }, []);

  const pollCurrentRunStatus = useCallback(() => {
    if (!currentRun) return;
    Logger.debug("Fetching current run status");

    axios
      .get(`/api/threads/${threadId}/runs/${currentRun.id}`)
      .then(async (response) => {
        const { run }: { run: Run } = response.data;
        setCurrentRun(run); // Update the run information

        if (!isRunActive(run)) {
          fetchMessages(); // Fetch new messages if the run isn't active
        } else if (run.status === "requires_action") {
          const outputs = await executeAssistantActions(run);
          submitFunctionOutputs(outputs, run.id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentRun]);

  function handlePromptSubmission() {
    Logger.debug("Handling prompt submission");
    const messageContent = userPrompt;
    setUserPrompt("");
    setAssistantWriting(true);

    return axios
      .post(`/api/threads/${threadId}/messages`, {
        messageContent: messageContent,
      })
      .then((response) => {
        const { message, run }: { message: Message; run: Run } = response.data;
        setMessages([...messages, message]);
        setCurrentRun(run);
      })
      .catch((error) => {
        Logger.error(error);
        setAssistantWriting(false);
      });
  }

  function submitFunctionOutputs(outputs: ToolOutput[], runId: string) {
    Logger.debug("Submitting function outputs");
    return axios
      .post(`/api/threads/${threadId}/runs/${runId}`, {
        toolOutputs: outputs,
      })
      .then((response) => {
        const { run }: { run: Run } = response.data;
        setCurrentRun(run);
      })
      .catch((error) => {
        Logger.error(error);
      });
  }

  const handleFileSubmission = async (file: File) => {
    const body = new FormData();
    body.append("file", file);
    setAssistantWriting(true);

    await axios
      .post(`/api/threads/${threadId}/messages/files`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setCurrentRun(response.data.run);
        setMessages([
          ...messages,
          generateAnnotation(file.name, "file"),
          generateAnnotation("Read files", "read-file"),
        ]);
      })
      .catch((error) => {
        console.log(error);
        setAssistantWriting(false);
      });
  };

  if (loading) return <AssistantComponentSkeleton />;

  return (
    <>
      <Box
        sx={{
          mx: { xs: 1, md: 4 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 1, md: 4 },
          height: { xs: "auto", md: "calc(100vh - 96px - 88px)" },
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          {messages.length === 0 ? (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography variant="h3" sx={{ fontSize: "1.4rem" }}>
                Where would you like to go?
              </Typography>
              <PromptInput
                userPrompt={userPrompt}
                setUserPrompt={setUserPrompt}
                onPromptSubmission={handlePromptSubmission}
                onFileUpload={handleFileSubmission}
                assistantWriting={assistantWriting}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  height: "calc(100vh - 184px - 46px)",
                  overflowY: "scroll",
                }}
              >
                <ChatHistory
                  messages={messages}
                  assistantWriting={assistantWriting}
                />

                <div ref={messagesEndRef} />
              </Box>
              <PromptInput
                userPrompt={userPrompt}
                setUserPrompt={setUserPrompt}
                onPromptSubmission={handlePromptSubmission}
                onFileUpload={handleFileSubmission}
                assistantWriting={assistantWriting}
              />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", md: "50%" },
          }}
        >
          <InteractiveMap
            mapCenter={mapCenter}
            mapZoomLevel={mapZoomLevel}
            pointsOfInterest={pointsOfInterest}
          />
          <FlightPopup flightInfo={flightInfo} />
        </Box>
      </Box>
    </>
  );
}

export default AssistantComponent;
