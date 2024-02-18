import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Featured = () => {
  const [hotelCountInCityData, setHotelCountInCityData] = useState([]);
  const navigatesTo = useNavigate();

  useEffect(() => {
    getCountByCity();
  }, []);

  const getCountByCity = async () => {
    let result = await axios(
      "http://localhost:3001/hotels/countbycity?cities=delhi,hydrabad,vizag"
    );
    setHotelCountInCityData(result.data);
  };

  const getValue = (city) => {
    if (hotelCountInCityData && hotelCountInCityData.length !== 0) {
      let result = hotelCountInCityData.filter((each) => each.label === city);
      return result && result[0] && result[0].value ? result[0].value : 5;
    }
    return 5;
  };

  const handleCityClick = (city) => {
    navigatesTo(
      `/Booking.com/hotels?searchresults.en-gb.html?&city=${city.toLowerCase()}`
      // &type=all&adult=${
      //   people.adult
      // }&child=${people.children}&rooms=${people.rooms}&from=${
      //   date[0].startDate
      // }&to=${date[0].endDate}`
      // {
      //   state: { destination, people, date },
      // }
    );
  };

  return (
    <Container>
      <Row>
        <Col sm={12} md={4} onClick={() => handleCityClick("delhi")}>
          <div className="card-style">
            <h1 className="city-name">New Delhi</h1>
            <p className="property-style">{getValue("delhi")} Properties</p>
          </div>
        </Col>

        <Col sm={12} md={4} onClick={() => handleCityClick("vizag")}>
          <div className="card-style2">
            <h1 className="city-name">Vishakapatnam</h1>
            <p className="property-style">{getValue("vizag")} Properties</p>
          </div>
        </Col>

        <Col sm={12} md={4} onClick={() => handleCityClick("hydrabad")}>
          <div className="card-style3">
            <h1 className="city-name">Hyderabad</h1>
            <p className="property-style">{getValue("hydrabad")} Properties</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Featured;
