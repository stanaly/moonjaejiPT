import React from "react";
import Image from "mui-image";
import { Container, Box } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  Typography,
  ButtonBase,
} from "@mui/material";
import { styled } from "@mui/system";
import logo from "./asset/logo.png";
import LoginToKakao from "./asset/LoginToKakao.png";
import LoginToGoogle from "./asset/LoginToGoogle.png";
import LoginToNaver from "./asset/LoginToNaver.png";

import "./App.css";
import { ClassNames } from "@emotion/react";
import { Style } from "@mui/icons-material";
import { yellow } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: "'Apple SD Gothic Neo', serif",
  },
});

const BodyContainer = styled(Container)({
  height: "100vh",
  width: 100,
  minWidth: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const Wrapper = styled(Container)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  marginRight: "0",
});

const LoginContainer = styled(Container)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: "0",
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BodyContainer maxWidth="xl" className="App">
        <Wrapper maxWidth="sm">
          <Image
            src={logo}
            width={110}
            height={115}
            duration={0}
            style={{
              marginLeft: "0.5rem",
            }}
          />
          <Typography variant="h1" noWrap sx={{ fontSize: "5rem" }}>
            안녕하세요!
          </Typography>
          <Typography variant="h1" noWrap sx={{ fontSize: "5rem" }}>
            문제지PT입니다!
          </Typography>
        </Wrapper>
        <LoginContainer maxWidth="sm">
          <ButtonBase
            sx={{ marginBottom: "20px" }}
            TouchRippleProps={{ style: { color: "#0093FF" } }}
          >
            <Image src={LoginToKakao} width="335px" duration={0}></Image>
          </ButtonBase>
          <ButtonBase
            sx={{ marginBottom: "20px" }}
            TouchRippleProps={{ style: { color: "#0093FF" } }}
          >
            <Image src={LoginToNaver} width="335px" duration={0}></Image>
          </ButtonBase>
          <ButtonBase
            sx={{ marginBottom: "20px" }}
            TouchRippleProps={{ style: { color: "#0093FF" } }}
          >
            <Image src={LoginToGoogle} width="335px" duration={0}></Image>
          </ButtonBase>
        </LoginContainer>
      </BodyContainer>
    </ThemeProvider>
  );
}

export default App;
