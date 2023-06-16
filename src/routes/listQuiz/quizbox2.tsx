import { Box, Typography, Button, Input, FormControl } from "@mui/material";
import { useState } from "react";
import Explanation from "./explanation";
import Memo from "./memo";

// QuizBox2 : 빈칸, 주관식

export default function QuizBox2({
  questionId,
  question,
  userSelect,
  changeUserSelectList,
  answer,
  condition,
  memo,
  changeMemo,
  explanation,
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

  const onChange = (e: any) => {
    setSelect(e.target.value);
    changeUserSelectList(questionId, e.target.value);
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
        <Box sx={{ padding: "10px", paddingBottom: "20px" }}>
          <FormControl
            sx={{
              marginLeft: "20px",
              width: "90%",
              display: "flex",
              justifyContent: "start",
            }}
          >
            <Input
              sx={{
                fontSize: "20px",
                fontWeight: "200",
                textAlign: "start",
              }}
              placeholder="정답"
              value={select}
              onChange={onChange}
            />
          </FormControl>
        </Box>
      </Box>
      {showExplanantion ? <Explanation explanation={explanation} /> : null}
      {showMemo ? <Memo memo={memo} changeMemo={changeMemo} /> : null}
    </Box>
  );
}
