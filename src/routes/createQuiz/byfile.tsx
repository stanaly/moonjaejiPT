import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";

export interface ByFileProps {
  onFileSelect: (file: File | null) => void;
}

export default function ByFile(props: ByFileProps) {
  const [selectedFile, setSelectedFile] = useState("파일을 선택해주세요.");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file.name);
      props.onFileSelect(file); // Call the callback with the selected file
    } else {
      setSelectedFile("파일을 선택해주세요.");
      props.onFileSelect(null); // Call the callback with null when no file is selected
    }
  };

  return (
    <Box
      sx={{
        height: "80px",
        width: "800px",
        margin: "0 auto",
        marginBottom: "298px",
        display: "flex",
        justifyContent: "space-between",
        outline: "solid",
        borderTopRightRadius: "4px",
        borderBottomRightRadius: "4px",
      }}
    >
      <Typography
        sx={{ margin: "auto 20px", fontSize: "18px", width: "100%" }}
        noWrap
      >
        {selectedFile}
      </Typography>
      <Button
        component="label"
        sx={{
          outline: "solid",
          width: "160px",
          fontSize: "20px",
          fontWeight: "bold",
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        <input type="file" onChange={handleFileChange} hidden />
        파일 선택
      </Button>
    </Box>
  );
}
