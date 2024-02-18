import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NoPage from "./Pages/Nopage";
import List from "./Pages/List";
import Hotel from "./Pages/Hotel";
import User from "./components/User";
import "bootstrap/dist/css/bootstrap.min.css";
import Bookings from "./Pages/Bookings";
import Profile from "./Pages/Profile";
import UserFavorites from "./components/User/UserFavorites";
import Analytics from "./Pages/Analytics";
// import { useState } from "react";
// import { format } from "date-fns";
// import { ToastContainer, toast } from "react-toastify";
// import { DateContext } from "./Context/DateContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Booking.com" index element={<Home />} />
        <Route path="/Booking.com/hotels" element={<List />} />
        <Route path="/Booking.com/hotel/:hotelname/:id" element={<Hotel />} />
        <Route path="/Booking.com/user/:name/profile" element={<User />}>
          <Route path="bookings" element={<Bookings />} />
          <Route path="" element={<Profile />} />
          <Route path="MyFavourite" element={<UserFavorites />} />
          <Route path="Analytics" element={<Analytics />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
