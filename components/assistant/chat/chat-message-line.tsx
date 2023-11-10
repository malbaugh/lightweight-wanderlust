import { Box, Typography } from "@mui/material";
import MuiMarkdown, { getOverrides } from "mui-markdown";
import { Highlight, themes } from "prism-react-renderer";

type Props = {
  lastMessage: boolean;
  role: "assistant" | "user";
  message: string;
};
function ChatMessageLine({ lastMessage, role, message }: Props) {
  return (
    <Box
      sx={{
        color: lastMessage ? "text.primary" : "text.secondary",
        paddingLeft: role === "assistant" ? "12px" : "44px",
        paddingTop: "2px",
      }}
    >
      {role === "assistant" ? (
        <MuiMarkdown
          overrides={{
            ...getOverrides({
              Highlight,
              themes,
              theme: themes.github,
              hideLineNumbers: true,
            }),
            p: {
              props: {
                style: {
                  fontSize: "1.4rem",
                  fontWeight: 450,
                  lineHeight: "1.8rem",
                  marginTop: 0,
                },
              },
            },
            li: {
              props: {
                style: {
                  fontSize: "1.4rem",
                  marginTop: 0,
                  fontWeight: 450,
                },
              },
            },
            span: {
              props: {
                style: {
                  fontSize: "1.4rem",
                  fontWeight: 450,
                  lineHeight: "1.8rem",
                  marginTop: 0,
                },
              },
            },
            h3: {
              props: {
                style: {
                  fontSize: "1.6rem",
                },
              },
            },
          }}
        >
          {message}
        </MuiMarkdown>
      ) : (
        <Typography
          sx={{
            fontSize: "1.4rem",
            fontWeight: 450,
            lineHeight: "1.8rem",
            pb: "22.4px",
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default ChatMessageLine;
