import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import AlertMsg from "../components/AlertMsg";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      {/* <AlertMsg /> */}

      <Outlet />

    </Stack>
  );
}

export default MainLayout;
