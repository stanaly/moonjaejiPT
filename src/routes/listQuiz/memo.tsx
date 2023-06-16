import { Box, Typography, Input, FormControl } from "@mui/material";
import { useState } from "react";

export default function Memo({ memo, changeMemo }: any) {
  const [memoText, setMemoText] = useState(memo);
  const onChangeMemo = (e: any) => {
    setMemoText(e.target.value);
    changeMemo(e.target.value);
  };

  return (
    <Box // 메모 박스
      sx={{
        width: "800px",
        height: "auto",
        borderRadius: "20px",
        display: "flex",
        boxShadow: "0 2px 3px rgba(0,0,0,0.4), 0 -1px 3px rgba(0,0,0,0.1)",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          margin: "15px 30px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FFDB1D",
            width: "40px",
            height: "30px",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{
              width: "100%",
              height: "100%",
              fontSize: "12px",
              fontWeight: "500",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
            }}
          >
            메모
          </Typography>
        </Box>
        <FormControl
          sx={{
            width: "90%",
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Input
            sx={{
              fontSize: "18px",
              fontWeight: "200",
              textAlign: "start",
            }}
            placeholder="메모"
            value={memoText}
            onChange={onChangeMemo}
            multiline
          />
        </FormControl>
      </Box>
    </Box>
  );
}
