import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import Explanation from "./explanation";
import Memo from "./memo";

// QuizBox1 : 객관식, 참/거짓
const AnswerButtonGroup = ({
  texts,
  select,
  handleSelect,
  questionId,
  changeUserSelectList,
  type,
}: any) => {
  const [answer, setAnswer] = useState(select);

  const handleClick = (select: string) => {
    setAnswer(select); //사용자가 택한 답
    handleSelect(select);
    changeUserSelectList(questionId, select);
  };

  return (
    <Box>
      {type === "MULTIPLE CHOICE"
        ? texts.map((text: string, index: number) => (
            <Button
              key={["a", "b", "c", "d"][index]}
              variant={
                answer === ["a", "b", "c", "d"][index] ? "contained" : "text"
              }
              onClick={() => handleClick(["a", "b", "c", "d"][index])}
              sx={{
                marginLeft: "12px",
                width: "90%",
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "200",
                  textAlign: "start",
                }}
              >
                {text}
              </Typography>
            </Button>
          ))
        : texts.map((text: string) => (
            <Button
              key={text}
              variant={answer === text ? "contained" : "text"}
              onClick={() => handleClick(text)}
              sx={{
                marginLeft: "12px",
                width: "90%",
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "200",
                  textAlign: "start",
                }}
              >
                {text}
              </Typography>
            </Button>
          ))}
    </Box>
  );
};

export default function QuizBox1({
  questionId,
  question,
  selectList,
  userSelect,
  changeUserSelectList,
  answer,
  condition,
  memo,
  changeMemo,
  explanation,
  type,
}: any) {
  const [select, setSelect] = useState(userSelect); // 사용자가 선택한 답
  const [showExplanantion, setShowExplanation] = useState(false); // 해설 버튼
  const [showMemo, setShowMemo] = useState(false); // 메모 버튼

  const boxStyles = {
    width: "800px",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    borderBottom: "1px solid",
    borderBottomColor: "black",
    display: "flex",
    justifyContent: "space-between",
  };

  const getBackgroundColor = () => {
    if (!condition) return undefined;
    return select === answer ? "#6BCAFF" : "#FF6B6B";
  };

  const conditionStyles = {
    backgroundColor: getBackgroundColor(),
  };

  const handleSelect = (select: string) => {
    setSelect(select);
  };

  return (
    <Box
      sx={{
        margin: "40px auto",
      }}
    >
      <Box
        sx={{
          width: "800px",
          height: "auto",
          borderRadius: "20px",
          display: "flex",
          boxShadow: "0 2px 3px rgba(0,0,0,0.4), 0 -1px 3px rgba(0,0,0,0.1)",
          flexDirection: "column",
        }}
      >
        <Box sx={{ ...boxStyles, ...conditionStyles }}>
          <Typography
            sx={{
              width: "650px",
              fontSize: "20px",
              marginLeft: "30px",
              marginTop: "12px",
              marginBottom: "auto",
              fontWeight: "bold",
            }}
          >
            {question}
          </Typography>
          <Box sx={{ display: "flex", marginRight: "15px" }}>
            {condition ? (
              <Button //해답버튼
                sx={{
                  ":hover": { backgroundColor: "#a3ee91" },
                  minWidth: "0px",
                  backgroundColor: "#7DE763",
                  margin: "5px",
                  width: "40px",
                  height: "30px",
                  fontSize: "12px",
                }}
                onClick={() => {
                  setShowExplanation(!showExplanantion);
                }}
              >
                해답
              </Button>
            ) : null}
            <Button //메모버튼
              sx={{
                ":hover": { backgroundColor: "#ffe14d" },
                minWidth: "0px",
                backgroundColor: "#FFDB1D",
                margin: "5px",
                width: "40px",
                height: "30px",
                fontSize: "12px",
              }}
              onClick={() => {
                setShowMemo(!showMemo);
              }}
            >
              메모
            </Button>
          </Box>
        </Box>
        <Box sx={{ padding: "10px" }}>
          <AnswerButtonGroup
            questionId={questionId}
            texts={selectList}
            select={select}
            handleSelect={handleSelect}
            changeUserSelectList={changeUserSelectList}
            type={type}
          />
        </Box>
      </Box>
      {showExplanantion ? <Explanation explanation={explanation} /> : null}
      {showMemo ? <Memo memo={memo} changeMemo={changeMemo} /> : null}
    </Box>
  );
}
