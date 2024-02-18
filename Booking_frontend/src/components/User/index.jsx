import React from "react";
import MyNavbar from "../MyNavbar";
import Header from "../Header";
import SideNav from "../SideNav";
import { Outlet } from "react-router-dom";

const User = () => {
  return (
    <>
      <MyNavbar type={"userComponent"} />
      <Header type={"list"} />
      <SideNav />
    </>
  );
};

export default User;
