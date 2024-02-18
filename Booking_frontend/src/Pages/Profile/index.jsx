import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import CustomGooglMaps from "../../components/GoogleMap";
import MUIChartsPractice from "../../components/MUIChartsPie";
import MUILineChart from "../../components/MUILineChart";

const Profile = () => {
  // const [value, setValue] = useState([1, 100]);
  // const [hotelCountInCityData, setHotelCountInCityData] = useState([]);
  // const [propertyCountInCity, setPropertyCountInCity] = useState([]);

  // useEffect(() => {
  //   getCountByCity();
  //   getPropertyCountInCity();
  // }, []);

  // const getCountByCity = async () => {
  //   let result = await axios(
  //     `http://localhost:3001/hotels/countbycity?cities=delhi,hydrabad,vizag`
  //   );
  //   setHotelCountInCityData(result.data);
  //   console.log(result.data, "hotel count");
  // };

  // const getPropertyCountInCity = async () => {
  //   let result = await axios(
  //     `http://localhost:3001/hotels/countbytypeandcity?city=hydrabad`
  //   );
  //   setPropertyCountInCity(result.data);
  //   console.log(result.data, "property count");
  // };

  return (
    <div className="bookings_container">
      <CustomGooglMaps />
    </div>
  );
};

export default Profile;
