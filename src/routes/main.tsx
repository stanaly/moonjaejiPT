import { createTheme, ThemeProvider } from "@mui/material";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import SideBar from "./sidebar";
import RightPanel from "./rightpanel";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

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

export default function Main() {
  const [cookies] = useCookies(["user_id"]);
  const Navigate = useNavigate();

  useEffect(() => {
    if (cookies["user_id"] === undefined) {
      Navigate("/login");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SideBar />
      <Outlet />
      <RightPanel />
    </ThemeProvider>
  );
}

export async function loader() {
  return null; //redirect("/login");
}

export async function action() {
  return null;
}
