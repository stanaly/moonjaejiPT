import { Box, Button, InputBase } from "@mui/material";

export default function ByUrl() {
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
      <InputBase
        sx={{ margin: "auto 20px", fontSize: "18px", width: "100%" }}
        placeholder="URL을 입력해주세요."
      />
      <Button
        sx={{
          outline: "solid",
          width: "160px",
          fontSize: "20px",
          fontWeight: "bold",
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        확인
      </Button>
    </Box>
  );
}
