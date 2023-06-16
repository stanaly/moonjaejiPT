import {
  createTheme,
  ThemeProvider,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Summary from "./summary";
import QuizBox1 from "./listQuiz/quizbox1";
import QuizBox2 from "./listQuiz/quizbox2";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/*
QuizBox1 : 객관식, 참/거짓
QuizBox2 : 빈칸, 주관식
 */

export default function Quiz() {
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
  const [userSelectList, setUserSelectList] = useState([]); // {question_id: value, user_select: value} 각 문제와 선택한 답
  const [condition, setCondition] = useState(false);
  const [memo, setMemo] = useState(); // select 값 없으면 초기화 필요!
  const location = useLocation();
  const [summary, setSummary] = useState("");
  const [datas, setDatas] = useState([]);
  const [multipleChoice, setMultipleChoice] = useState([]); // 객관식
  const [singleTermAnswer, setSingleTermAnswer] = useState([]); // 주관식
  const [trueOrFalse, setTrueOrFalse] = useState([]); // 참/거짓
  const [fillInTheBlank, setFillInTheBlank] = useState([]); // 빈칸
  const [title, setTitle] = useState("");
  const Navigate = useNavigate();

  const changeUserSelectList = (question_id: string, user_select: string) => {
    setUserSelectList((prevUserSelectList: any) => {
      const updatedQuizData = prevUserSelectList.map((question: any) =>
        question.question_id === question_id
          ? { ...question, user_select: user_select }
          : question
      );
      return updatedQuizData;
    });
  };

  const Score = async () => {
    // 채점함수
    setCondition(true);
    fetch("http://172.20.10.3:5000/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        packages: userSelectList,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the server response
        console.log(data);
        Navigate("/score", {
          state: {
            data: data,
            quiz_id: location.state.quiz_id,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Reset = async () => {
    // 리셋 함수
    setCondition(false);
    const quiz_id = location.state.quiz_id;
    fetch(`http://172.20.10.3:5000/reset/${quiz_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const changeMemo = (memo: any) => {
    setMemo(memo);
    console.log(memo);
  };

  const handleCondition = (bool: any) => {
    setCondition(bool);
  };

  useEffect(() => {
    const quiz_id = location.state.quiz_id;

    fetch(`http://172.20.10.3:5000/show/${quiz_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the server response
        console.log(data);
        setSummary(data["summary"]);
        setDatas(data["data"]);
        setTitle(data["title"]);
        const list = data["data"].map((data: any) => ({
          question_id: data["question_id"],
          user_select: data["user_select"],
        }));
        setUserSelectList(list);

        // 객관식
        const multipleChoice = data["data"].filter(
          (data: any) => data["type"] === "MULTIPLE CHOICE"
        );
        setMultipleChoice(multipleChoice);

        // 주관식
        const singleTermAnswer = data["data"].filter(
          (data: any) => data["type"] === "SINGLE TERM ANSWER"
        );
        setSingleTermAnswer(singleTermAnswer);

        // 참/거짓
        const trueOrFalse = data["data"].filter(
          (data: any) => data["type"] === "TRUE OR FALSE"
        );
        setTrueOrFalse(trueOrFalse);

        // 빈칸
        const fillInTheBlank = data["data"].filter(
          (data: any) => data["type"] === "FILL-IN-THE-BLANK"
        );
        setFillInTheBlank(fillInTheBlank);

        if (data["condition"] === "unscored") {
          setCondition(false);
        } else if (data["condition"] === "scored") {
          setCondition(true);
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        // Handle any error that occurs during the request
        console.error(error);
      });
  }, []);

  const userSelect = (question_id: string) => {
    const filteredData = userSelectList.filter(
      (data: any) => data["question_id"] === question_id
    );
    if (filteredData.length > 0) {
      const firstMatchingElement = filteredData[0];
      return firstMatchingElement["user_select"];
    }
    // Handle case when no matching element is found
    return null;
  };

  const QuizMultipleChoice = () => {
    const quiz = multipleChoice.map((data: any) => (
      <QuizBox1
        key={data["question_id"]}
        questionId={data["question_id"]}
        question={data["question"]}
        selectList={[data["a"], data["b"], data["c"], data["d"]]}
        userSelect={userSelect(data["question_id"])}
        changeUserSelectList={changeUserSelectList}
        answer={data["answer"]}
        condition={condition}
        memo={data["memo"]}
        changeMemo={changeMemo}
        explanation={data["explanation"]}
        type={data["type"]}
      />
    ));
    return <>{quiz}</>;
  };

  const QuizTrueOrFalse = () => {
    const quiz = trueOrFalse.map((data: any) => (
      <QuizBox1
        key={data["question_id"]}
        questionId={data["question_id"]}
        question={data["question"]}
        selectList={["참", "거짓"]}
        userSelect={data["user_select"]}
        changeUserSelectList={changeUserSelectList}
        answer={data["answer"]}
        condition={condition}
        memo={data["memo"]}
        changeMemo={changeMemo}
        explanation={data["explanation"]}
        type={data["type"]}
      />
    ));
    return <>{quiz}</>;
  };

  const QuizSingleTermAnswer = () => {
    const quiz = singleTermAnswer.map((data: any) => (
      <QuizBox2
        key={data["question_id"]}
        questionId={data["question_id"]}
        question={data["question"]}
        userSelect={data["user_select"]}
        changeUserSelectList={changeUserSelectList}
        answer={data["answer"]}
        condition={condition}
        memo={data["memo"]}
        changeMemo={changeMemo}
        explanation={data["explanation"]}
        type={data["type"]}
      />
    ));
    return <>{quiz}</>;
  };

  const QuizFillInTheBlank = () => {
    const quiz = fillInTheBlank.map((data: any) => (
      <QuizBox2
        key={data["question_id"]}
        questionId={data["question_id"]}
        question={data["question"]}
        userSelect={data["user_select"]}
        changeUserSelectList={changeUserSelectList}
        answer={data["answer"]}
        condition={condition}
        memo={data["memo"]}
        changeMemo={changeMemo}
        explanation={data["explanation"]}
        type={data["type"]}
      />
    ));
    return <>{quiz}</>;
  };

  return (
    <ThemeProvider theme={theme}>
      {datas.length !== 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "auto",
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              position: "fixed",
              width: "810px",
              margin: "0 auto",
              bottom: "0",
              left: "0",
              right: "0",
              backgroundColor: "#ffffff",
              zIndex: "1",
              display: "flex",
            }}
          >
            {condition ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button // 채점 버튼
                  color="primary"
                  sx={{
                    ":hover": { backgroundColor: "#99bbff" },
                    width: "150px",
                    margin: "0 auto",
                    marginTop: "10px",
                    marginBottom: "30px",
                    fontSize: "30px",
                    boxShadow:
                      "0 2px 3px rgba(0,0,0,0.4), 0 -1px 3px rgba(0,0,0,0.1)",
                    backgroundColor: "#6B9DFF",
                    color: "#ffffff",
                  }}
                  onClick={Score}
                >
                  채점
                </Button>
                <Button // 리셋 버튼
                  color="primary"
                  sx={{
                    ":hover": { backgroundColor: "#e699ff" },
                    width: "150px",
                    margin: "0 auto",
                    marginTop: "10px",
                    marginBottom: "30px",
                    fontSize: "30px",
                    boxShadow:
                      "0 2px 3px rgba(0,0,0,0.4), 0 -1px 3px rgba(0,0,0,0.1)",
                    backgroundColor: "#D96BFF",
                    color: "#ffffff",
                  }}
                  onClick={Reset}
                >
                  리셋
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button // 채점 버튼
                  color="primary"
                  sx={{
                    ":hover": { backgroundColor: "#99bbff" },
                    width: "150px",
                    margin: "0 auto",
                    marginTop: "10px",
                    marginBottom: "30px",
                    fontSize: "30px",
                    boxShadow:
                      "0 2px 3px rgba(0,0,0,0.4), 0 -1px 3px rgba(0,0,0,0.1)",
                    backgroundColor: "#6B9DFF",
                    color: "#ffffff",
                  }}
                  onClick={Score}
                >
                  채점
                </Button>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              position: "fixed",
              width: "810px",
              margin: "0 auto",
              top: "0",
              left: "0",
              right: "0",
              backgroundColor: "#ffffff",
              zIndex: "1",
            }}
          >
            <Typography //  제목
              variant="h1"
              component="h1"
              sx={{
                marginTop: "30px",
                marginBottom: "10px",
                fontSize: "50px",
                textAlign: "center",
                textDecoration: "underline",
                textDecorationThickness: "2px",
                textUnderlineOffset: "8px",
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              paddingTop: "150px",
              paddingBottom: "150px",
            }}
          >
            <Summary content={summary} />
            <QuizMultipleChoice />
            <QuizTrueOrFalse />
            <QuizSingleTermAnswer />
            <QuizFillInTheBlank />
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}
export async function loader() {
  return null; //redirect("/login");
}

export async function action() {
  return null;
}
