/* eslint-disable no-lone-blocks */
import {
  Button,
  createTheme,
  ThemeProvider,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import ByText from "./createQuiz/bytext";
import ByURL from "./createQuiz/byurl";
import ByFile from "./createQuiz/byfile";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const SelectButton = (props: any) => (
  <Button
    size="large"
    color="primary"
    onClick={() => {
      props.onClick();
    }}
    sx={{
      width: "80px",
      fontSize: "23px",
      margin: "0 10px",
      fontWeight: "bold",
      padding: "1px 1px",
      boxShadow: "0 2px 3px rgba(0,0,0,0.4), 0 -1px 3px rgba(0,0,0,0.1)",
    }}
  >
    {props.children}
  </Button>
);

const SelectedButton = (props: any) => (
  <Button
    size="large"
    onClick={() => {
      props.onClick();
    }}
    sx={{
      ":hover": { backgroundColor: "#405872" },
      width: "80px",
      fontSize: "23px",
      margin: "0 10px",
      fontWeight: "bold",
      padding: "1px 1px",
      boxShadow: "0 2px 3px rgba(0,0,0,0.4), 0 -1px 3px rgba(0,0,0,0.1)",
      backgroundColor: "#35495E",
      color: "#FFFFFF",
    }}
  >
    {props.children}
  </Button>
);

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

export default function CreateQuiz() {
  const [cookies] = useCookies(["user_id"]);
  const Navigate = useNavigate();
  const [type, setType] = useState("TEXT");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [buttonClicks, setButtonClicks] = useState([
    false, // 객관식 (multiple choice)
    false, // 주관식 (single term answer)
    false, // 참/거짓 (true or false)
    false, // 빈칸 (fill-in-the-blank)
  ]);
  let inputData;

  const changeButtonClicks = (index: number) => {
    setButtonClicks((prevButtonClicks) => {
      const tempButtonClicks = [...prevButtonClicks]; // Create a copy of the previous state array
      tempButtonClicks[index] = !tempButtonClicks[index]; // Update the specific index
      return tempButtonClicks; // Set the updated array as the new state
    });
  };

  const handleCreateQuestion = () => {
    Navigate("loading"); // direct to quiz page
    /*
    const formData = new FormData();
    if (selectedFile != null) {
      formData.append("file", selectedFile);
      formData.append("user_id", cookies["user_id"]);
      {
        buttonClicks[0]
          ? formData.append("multiple choice", "true")
          : formData.append("multiple choice", "false");
      }
      {
        buttonClicks[1]
          ? formData.append("single term answer", "true")
          : formData.append("single term answer", "false");
      }
      {
        buttonClicks[2]
          ? formData.append("true or false", "true")
          : formData.append("true or false", "false");
      }
      {
        buttonClicks[3]
          ? formData.append("fill-in-the-blank", "true")
          : formData.append("fill-in-the-blank", "false");
      }
      console.log(formData);

      // Send the form data to the server using fetch or any other method
      fetch("http://172.20.10.3:5000/createDoc", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the server response
          console.log(data);
          Navigate("/quiz", { state: { quiz_id: data } });
        })
        .catch((error) => {
          // Handle any error that occurs during the request
          console.error(error);
        });
    }
    */
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  if (type === "TEXT") {
    inputData = <ByText />;
  } else if (type === "URL") {
    inputData = <ByURL />;
  } else {
    inputData = <ByFile onFileSelect={handleFileSelect} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "auto",
          margin: "0 auto",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            margin: "50px",
            fontSize: "70px",
            textAlign: "center",
          }}
        >
          문제 생성
        </Typography>
        <Box sx={{ display: "flex", marginTop: "0px", marginBottom: "60px" }}>
          <Box sx={{ margin: "0 auto" }}>
            {type === "TEXT" ? (
              <SelectedButton
                onClick={() => {
                  setType("TEXT");
                }}
              >
                텍스트
              </SelectedButton>
            ) : (
              <SelectButton
                onClick={() => {
                  setType("TEXT");
                }}
              >
                텍스트
              </SelectButton>
            )}
            {type === "FILE" ? (
              <SelectedButton
                onClick={() => {
                  setType("FILE");
                }}
              >
                파일
              </SelectedButton>
            ) : (
              <SelectButton
                onClick={() => {
                  setType("FILE");
                }}
              >
                파일
              </SelectButton>
            )}
            {type === "URL" ? (
              <SelectedButton
                onClick={() => {
                  setType("URL");
                }}
              >
                URL
              </SelectedButton>
            ) : (
              <SelectButton
                onClick={() => {
                  setType("URL");
                }}
              >
                URL
              </SelectButton>
            )}
          </Box>
        </Box>
        {inputData}
        <Box sx={{ display: "flex", marginBottom: "0px", marginTop: "60px" }}>
          <Box sx={{ margin: "0 auto" }}>
            {buttonClicks[0] ? (
              <SelectedButton
                onClick={() => {
                  changeButtonClicks(0);
                }}
              >
                객관식
              </SelectedButton>
            ) : (
              <SelectButton
                onClick={() => {
                  changeButtonClicks(0);
                }}
              >
                객관식
              </SelectButton>
            )}
            {buttonClicks[1] ? (
              <SelectedButton
                onClick={() => {
                  changeButtonClicks(1);
                }}
              >
                주관식
              </SelectedButton>
            ) : (
              <SelectButton
                onClick={() => {
                  changeButtonClicks(1);
                }}
              >
                주관식
              </SelectButton>
            )}
            {buttonClicks[2] ? (
              <SelectedButton
                onClick={() => {
                  changeButtonClicks(2);
                }}
              >
                참/거짓
              </SelectedButton>
            ) : (
              <SelectButton
                onClick={() => {
                  changeButtonClicks(2);
                }}
              >
                참/거짓
              </SelectButton>
            )}
            {buttonClicks[3] ? (
              <SelectedButton
                onClick={() => {
                  changeButtonClicks(3);
                }}
              >
                빈칸
              </SelectedButton>
            ) : (
              <SelectButton
                onClick={() => {
                  changeButtonClicks(3);
                }}
              >
                빈칸
              </SelectButton>
            )}
          </Box>
        </Box>
        <Button
          color="primary"
          sx={{
            ":hover": { backgroundColor: "#9bbde4" },
            width: "240px",
            margin: "0 auto",
            marginTop: "50px",
            marginBottom: "140px",
            padding: "10px 50px",
            fontSize: "25px",
            fontWeight: "bold",
            boxShadow: "0 2px 3px rgba(0,0,0,0.4), 0 -1px 3px rgba(0,0,0,0.1)",
            backgroundColor: "#79A7DA",
            color: "#ffffff",
          }}
          onClick={handleCreateQuestion}
        >
          문제 생성하기
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export async function loader() {
  return null; //redirect("/login");
}

export async function action() {
  return null;
}
