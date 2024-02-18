import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./style.css";

const SideNav = () => {
  const navigate = useNavigate();

  return (
    <div className="booking">
      <div className="side_nav">
        <div className="list_item" onClick={() => navigate("")}>
          Profile
        </div>
        <div
          className="list_item"
          onClick={() => navigate("bookings?status=completed")}
        >
          My Bookings
        </div>
        <div className="list_item" onClick={() => navigate("MyFavourite")}>
          Favourite
        </div>
        <div className="list_item" onClick={() => navigate("Analytics")}>
          Analytics
        </div>
      </div>
      <div className="out_let">
        <Outlet />
      </div>
    </div>
  );
};

export default SideNav;
