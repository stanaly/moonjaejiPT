import { Box, Typography } from "@mui/material";

export default function Summary({ content }: { content: any }) {
  return (
    <Box
      sx={{
        width: "800px",
        height: "auto",
        margin: "40px auto",
        borderRadius: "20px",
        display: "flex",
        boxShadow: "0 2px 3px rgba(0,0,0,0.4), 0 -1px 3px rgba(0,0,0,0.1)",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "800px",
          height: "50px",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          borderBottom: "1px solid",
          borderBottomColor: "black",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: "25px",
            marginLeft: "30px",
            marginTop: "12px",
            marginBottom: "auto",
            fontWeight: "bold",
          }}
        >
          요약 내용
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{ margin: "30px", fontSize: "20px", fontWeight: "200" }}
        >
          {content}
        </Typography>
      </Box>
    </Box>
  );
}
