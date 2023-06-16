import { Box, Typography } from "@mui/material";

export default function Explanation({ explanation }: any) {
  return (
    <Box // 해답 박스
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
            backgroundColor: "#7DE763",
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
            해답
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: "18px",
          }}
        >
          {explanation}
        </Typography>
      </Box>
    </Box>
  );
}
