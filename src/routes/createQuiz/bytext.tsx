import { TextField } from "@mui/material";

export default function ByText() {
  return (
    <TextField
      id="outlined-textarea"
      label="텍스트를 입력하세요."
      placeholder="문제 생성시 사용되는 텍스트입니다."
      sx={{ width: "800px" }}
      rows={15}
      multiline
      focused
    />
  );
}
