import { Box, Input } from "@mui/material";
import { useState, DragEvent, Dispatch, SetStateAction } from "react";

type Props = {
  userPrompt: string;
  setUserPrompt: Dispatch<SetStateAction<string>>;
  onPromptSubmission: () => void;
  onFileUpload: (file: File) => void;
  assistantWriting: boolean;
};
function PromptInput({
  userPrompt,
  setUserPrompt,
  onPromptSubmission,
  onFileUpload,
  assistantWriting,
}: Props) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files[0];

    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <Box
      component="div"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        border: isDragOver ? "1px solid" : "1px solid transparent",
        px: 2,
        py: 1,
        borderRadius: 2,
      }}
    >
      <Input
        fullWidth
        disableUnderline
        value={userPrompt}
        onChange={(event) => setUserPrompt(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onPromptSubmission();
          }
        }}
        disabled={assistantWriting}
        placeholder="Start typing or upload a file..."
        sx={{ fontSize: "1.6rem", fontWeight: 600 }}
      />
    </Box>
  );
}

export default PromptInput;
