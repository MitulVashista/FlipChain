import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./AppBar";

function AppLayout() {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
}

export default AppLayout;
