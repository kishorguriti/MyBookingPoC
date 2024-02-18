import React from "react";
import CompletedBookings from "./CompletedBookings";
import UpComingBookings from "./UpComingBookings";
import "./style.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import Loading from "react-loading";

const Bookings = () => {
  let loaderType = "spin";
  const moment = require("moment");
  const navigatesTo = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("completed");
  const [bookedHotels, setBookedHotels] = useState([]);
  const [userCompletedBookings, setUserCompletedBookings] = useState([]);
  const [userUpComingBookings, setUserUpComingBookins] = useState([]);
  const [selectedFav, setSelectedFav] = useState(false);

  let loginUser = JSON.parse(localStorage.getItem("loggedUser"));

  function onCompleted(status) {
    setSelectedTab(status);
    setLoading(true);
    navigatesTo(`/Booking.com/user/naidu/profile/bookings?status=completed`);
  }

  function onUpcoming(status) {
    setSelectedTab(status);
    setLoading(true);
    navigatesTo(`/Booking.com/user/naidu/profile/bookings?status=upcoming`);
  }

  const GetAllHotel = async (user) => {
    let completedBooking = [];
    let upComingBooking = [];
    await Promise.all(
      user.BookingDetails.map((each) => {
        let BookingEndDate =
          each.unavailableDates[each.unavailableDates.length - 1];
        BookingEndDate = moment(BookingEndDate, "DD/MM/YYYY");
        BookingEndDate = BookingEndDate.toISOString();

        const daysDiff = Math.floor(
          (new Date(BookingEndDate).getTime() - new Date().getTime()) /
            (24 * 60 * 60 * 1000)
        );

        if (daysDiff < 0) {
          completedBooking.push(each);
        } else {
          upComingBooking.push(each);
        }
      })
    );

    setUserCompletedBookings(completedBooking);
    setUserUpComingBookins(upComingBooking);

    if (selectedTab === "completed") {
      return completedBooking;
    } else {
      return upComingBooking;
    }
  };

  const getdataBasedOnStatus = async (hotels) => {
    if (hotels.length === 0) {
      setLoading(false);
      setBookedHotels([]);
      return;
    }
    const BookedhotelsArray = [];
    await Promise.all(
      hotels.map(async (each, i) => {
        try {
          const res = await fetch(
            `http://localhost:3001/hotels/user/booked?hotelIds=${each.hotelId}`
          );
          let bookedHotel = await res.json();
          BookedhotelsArray.push({ ...bookedHotel[0], ...each });
        } catch (err) {
          console.log(err);
        }
      })
    );
    setLoading(false);
    setBookedHotels(BookedhotelsArray);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/users/${loginUser._id}`)
      .then(async (res) => {
        return await res.json();
      })
      .then(async (res) => {
        let hotels = await GetAllHotel(res);
        await getdataBasedOnStatus(hotels);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedTab]);

  return (
    <>
      <div className="bookings_container">
        <button
          className={
            selectedTab === "completed"
              ? "booking_status active_status"
              : "booking_status"
          }
          onClick={() => onCompleted("completed")}
        >
          completed
        </button>
        <button
          className={
            selectedTab === "upcoming"
              ? "booking_status active_status"
              : "booking_status"
          }
          onClick={() => onUpcoming("upcoming")}
        >
          upcoming
        </button>
      </div>

      {!loading ? (
        selectedTab === "completed" ? (
          <CompletedBookings
            completedBookingsData={bookedHotels}
            ToRelode={getdataBasedOnStatus}
          />
        ) : (
          <UpComingBookings
            upcomingBookingsData={bookedHotels}
            ToRelode={getdataBasedOnStatus}
          />
        )
      ) : (
        <div className="loader_container">
          <ReactLoading type={loaderType} color="#003580" />
        </div>
      )}
    </>
  );
};

export default Bookings;
