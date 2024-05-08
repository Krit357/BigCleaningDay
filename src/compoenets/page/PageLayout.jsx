import React from "react";
import SideBar from "../sideBar/SideBar";

const PageLayout = ({ children }) => {
  return (
    <div className="h-screen grid grid-cols-6">
      <SideBar />
      <div className="col-span-5">{children}</div>
    </div>
  );
};

export default PageLayout;
