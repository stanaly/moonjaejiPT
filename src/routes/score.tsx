import {
  createTheme,
  ThemeProvider,
  Box,
  Typography,
  Button,
} from "@mui/material";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface DataSet1 {
  name: string;
  percent: number;
}

interface DataSet2 {
  round: number;
  percent1: number;
  percent2: number;
  percent3: number;
  percent4: number;
}

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

export default function Score() {
  const toPercent = (decimal: any, fixed = 0) => {
    return `${decimal}%`;
  };

  const formatter = (decimal: any) => {
    return `${decimal}%`;
  };

  const [dataSet1, setDataSet1] = useState<DataSet1[]>([]);
  const [dataSet2, setDataSet2] = useState<DataSet2[]>([]);
  const Navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state.data === undefined) {
      Navigate("/quiz");
    } else {
      const data1: any = Object.values(
        location.state.data[location.state.data.length - 1]
      )[0];
      const dataSet1 = data1.map((score: any, index: any) => {
        return {
          percent: Number(Object.values(score)),
          name: ["객관식", "주관식", "빈칸", "참/거짓"][index],
        };
      });
      setDataSet1(dataSet1);

      const data2: any = location.state.data;
      console.log(data2);
      const dataSet2 = data2.map((data: any, index: any) => {
        const values = Object.values(data)[0] as any;
        return {
          round: index + 1,
          percent1: Number(values[0]["MULTIPLE CHOICE"]),
          percent2: Number(values[1]["SINGLE TERM ANSWER"]),
          percent3: Number(values[2]["FILL-IN-THE-BLANK"]),
          percent4: Number(values[3]["TRUE OR FALSE"]),
        };
      });
      setDataSet2(dataSet2);
      console.log(dataSet2);
    }
  }, []);

  const Chart1 = () => (
    <BarChart
      width={500}
      height={300}
      data={dataSet1}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      layout="vertical"
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" domain={[0, 100]} tickFormatter={toPercent} />
      <YAxis dataKey="name" type="category" />
      <Tooltip formatter={formatter} />
      <Legend />
      <Bar dataKey="percent" fill="#8884d8" />
    </BarChart>
  );

  const Chart2 = () => {
    return (
      <LineChart width={500} height={300} data={dataSet2}>
        <XAxis dataKey="round" />
        <YAxis domain={[0, 100]} />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="percent1"
          stroke="#8884d8"
          name="객관식"
        />
        <Line
          type="monotone"
          dataKey="percent2"
          stroke="#82ca9d"
          name="주관식"
        />
        <Line type="monotone" dataKey="percent3" stroke="#ffc658" name="빈칸" />
        <Line
          type="monotone"
          dataKey="percent4"
          stroke="#ff6f42"
          name="참/거짓"
        />
      </LineChart>
    );
  };

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
          채점 결과
        </Typography>
        <Chart1 />
        <Chart2 />
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
          onClick={() => {
            Navigate("/quiz", {
              state: { quiz_id: "69000695c0484eac821d2e6d73683647" }, // direct to quiz page
            });
          }}
        >
          확인
        </Button>
      </Box>
    </ThemeProvider>
  );
}
