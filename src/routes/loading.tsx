import { TailSpin } from "react-loader-spinner";
import { ThemeProvider, createTheme, Box, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: "'Apple SD Gothic Neo', serif",
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#35495E",
    },
  },
});

export default function Loading() {
  const Navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const element: any = ref.current;
    element.style.transition = "opacity 3s";
    setTimeout(() => {
      element.style.opacity = 1;
    }, 100);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Navigate("/quiz", {
        state: { quiz_id: "69000695c0484eac821d2e6d73683647" }, // direct to quiz page
      });
    }, 10000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        ref={ref}
        sx={{
          opacity: "0",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "auto",
          margin: "0 auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ paddingBottom: "150px" }}>
          <Box
            sx={{ width: "auto", display: "flex", justifyContent: "center" }}
          >
            <TailSpin
              height="300"
              width="300"
              color="#000000"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </Box>
          <Box sx={{ textAlign: "center", marginTop: "100px" }}>
            <Typography variant="h2">문제를 생성하고 있습니다..</Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export async function loader() {
  return null;
}

export async function action() {
  return null;
}
