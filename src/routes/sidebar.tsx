import {
  Box,
  Typography,
  Button,
  IconButton,
  createTheme,
  ThemeProvider,
  Icon,
} from "@mui/material";
import Image from "mui-image";
import logo from "../asset/logo.png";
import QuizIcon from "@mui/icons-material/Description";
import paper from "../asset/paper.png";
import editPng from "../asset/edit.png";
import deletePng from "../asset/delete.png";

const theme = createTheme({
  typography: {
    fontFamily: "'Apple SD Gothic Neo', serif",
  },
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

export default function SideBar() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "white",
          width: "250px",
          height: "100vh",
          boxShadow: "5px 0 5px -3px #E2E2E2",
          position: "fixed",
        }}
      >
        <Image
          src={logo}
          width={58}
          height={60}
          duration={0}
          wrapperStyle={{
            margin: "0 auto",
            paddingTop: "30px",
            paddingBottom: "70px",
          }}
        />
        <Box sx={{ marginLeft: "15px", marginRight: "15px" }}>
          {/* 오늘 */}
          <Typography variant="body1" sx={{ marginTop: "10px" }}>
            오늘
          </Typography>
          <Box
            sx={{
              margin: "6px",
              display: "flex",
              flexDirection: "row",
              width: "208px",
            }}
          >
            <Button
              color="primary"
              startIcon={<QuizIcon />}
              sx={{ width: "150px", display: "flex", justifyContent: "start" }}
            >
              운영체제
            </Button>
            <IconButton sx={{ padding: "2px" }}>
              <Icon
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={editPng}
                  width="70%"
                  height="70%"
                  duration={0}
                ></Image>
              </Icon>
            </IconButton>
            <IconButton sx={{ padding: "2px" }}>
              <Icon
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={deletePng}
                  width="70%"
                  height="70%"
                  duration={0}
                ></Image>
              </Icon>
            </IconButton>
          </Box>
          {/* 1일 전 */}
          <Typography variant="body1" sx={{ marginTop: "10px" }}>
            1일 전
          </Typography>
          <Box
            sx={{
              margin: "6px",
              display: "flex",
              flexDirection: "row",
              width: "208px",
            }}
          >
            <Image src={paper} width="7%" height="7%" duration={0}></Image>
            <Typography
              variant="body1"
              sx={{ marginLeft: "10px", fontSize: "14px", marginTop: "2px" }}
            >
              데이터베이스
            </Typography>
            <Image
              src={editPng}
              width="9%"
              height="9%"
              duration={0}
              wrapperStyle={{ marginLeft: "auto" }}
            ></Image>
            <Image
              src={deletePng}
              width="9%"
              height="9%"
              duration={0}
              wrapperStyle={{ marginLeft: "10px" }}
            ></Image>
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
