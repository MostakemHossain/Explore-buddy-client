import DashBoardDrawer from "@/components/Dashboard/DashboardDrawer/DashBoardDrawer";

import React from "react";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return <DashBoardDrawer>{children}</DashBoardDrawer>;
};

export default DashBoardLayout;
