import { Box } from "@mui/material";
import { ChatMessageLine } from "@components";
import ExploreIcon from "@mui/icons-material/ExploreOutlined";
import ZoomIcon from "@mui/icons-material/ZoomOutMapOutlined";
import MarkerIcon from "@mui/icons-material/PlaceOutlined";
import GlobeIcon from "@mui/icons-material/PublicOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import FileIcon from "@mui/icons-material/InsertDriveFileOutlined";
import FlightIcon from "@mui/icons-material/FlightOutlined";
import { Message } from "@objects";

type Props = {
  message: Message;
  lastMessage: boolean;
};
function ChatMessage({ message, lastMessage }: Props) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      {message.role === "assistant" && (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {message.type === "zoom" && (
            <ZoomIcon
              sx={{
                fontWeight: 500,
                color: lastMessage ? "text.primary" : "text.secondary",
                height: 32,
                width: 32,
              }}
            />
          )}
          {message.type === "mark" && (
            <MarkerIcon
              sx={{
                fontWeight: 500,
                color: lastMessage ? "text.primary" : "text.secondary",
                height: 32,
                width: 32,
              }}
            />
          )}
          {message.type === "center" && (
            <GlobeIcon
              sx={{
                fontWeight: 500,
                color: lastMessage ? "text.primary" : "text.secondary",
                height: 32,
                width: 32,
              }}
            />
          )}
          {message.type === "dialog" && (
            <ExploreIcon
              sx={{
                fontWeight: 500,
                color: lastMessage ? "text.primary" : "text.secondary",
                height: 32,
                width: 32,
              }}
            />
          )}
          {message.type === "file" && (
            <FileIcon
              sx={{
                fontWeight: 500,
                color: lastMessage ? "text.primary" : "text.secondary",
                height: 32,
                width: 32,
              }}
            />
          )}
          {message.type === "read-file" && (
            <SearchIcon
              sx={{
                fontWeight: 500,
                color: lastMessage ? "text.primary" : "text.secondary",
                height: 32,
                width: 32,
              }}
            />
          )}
          {message.type === "flight" && (
            <FlightIcon
              sx={{
                fontWeight: 500,
                color: lastMessage ? "text.primary" : "text.secondary",
                height: 32,
                width: 32,
              }}
            />
          )}
        </Box>
      )}

      {message.content.map((content, i) => {
        if (content.type === "text") {
          return (
            <ChatMessageLine
              key={i}
              lastMessage={lastMessage}
              role={message.role as "user" | "assistant"}
              message={content.text.value}
            />
          );
        } else {
          // TODO: Add support for files
          return null;
        }
      })}
    </Box>
  );
}

export default ChatMessage;
