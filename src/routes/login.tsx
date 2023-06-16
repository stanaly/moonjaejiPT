import { useEffect } from "react";
import Image from "mui-image";
import { Container } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  Typography,
  ButtonBase,
} from "@mui/material";
import { styled } from "@mui/system";
import logo from "../asset/logo.png";
import LoginToKakao from "../asset/LoginToKakao.png";
import LoginToGoogle from "../asset/LoginToGoogle.png";
import LoginToNaver from "../asset/LoginToNaver.png";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

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

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";

    const jsKey = "4620daa746ed1a3290f00b43f70095eb";

    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      (window as any).Kakao.init(jsKey);
    };
    const loginLink = document.getElementById("kakao-login-link");
    if (loginLink) {
      loginLink.addEventListener("click", function (e) {
        e.preventDefault(); // 링크 클릭 시 기본 동작 방지

        (window as any).Kakao.Auth.loginForm({
          scope: "profile_nickname, profile_image, account_email",
          success: function () {
            (window as any).Kakao.API.request({
              url: "/v2/user/me",
              success: function (authObj: any) {
                // profile 정보 넘겨주기(form 으로 만들어서 post형식으로 보내기)

                // Send the form data to the server using fetch or any other method
                const formData = new FormData();

                formData.append("name", authObj.kakao_account.profile.nickname);
                formData.append("email", authObj.kakao_account.email);
                formData.append(
                  "profile_image_url",
                  authObj.kakao_account.profile.profile_image_url
                );
                formData.append(
                  "thumbnail_image_url",
                  authObj.kakao_account.profile.thumbnail_image_url
                );
                formData.append("platform", "kakao");

                fetch("http://172.20.10.3:5000/registerUser", {
                  method: "POST",
                  body: formData,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    const cookies = new Cookies();
                    cookies.set("user_id", data, { path: "/" });
                    navigate("/");
                  })
                  .catch((error) => {
                    // Handle any error that occurs during the request
                    console.error(error);
                  });
              },
            });
          },
          fail: function (error: any) {
            console.log(error);
          },
        });
      });
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);
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
            id="kakao-login-link"
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

export async function loader() {
  return null;
}

export async function action() {
  return null;
}
