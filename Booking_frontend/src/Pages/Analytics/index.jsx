import React, { useEffect, useState } from "react";
import "./style.css";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import CustomGooglMaps from "../../components/GoogleMap";
import MUIChartsPractice from "../../components/MUIChartsPie";
import MUILineChart from "../../components/MUILineChart";
import Switch from "@mui/material/Switch";

const Analytics = () => {
  const [value, setValue] = useState([1, 100]);
  const [hotelCountInCityData, setHotelCountInCityData] = useState([]);
  const [propertyCountInCity, setPropertyCountInCity] = useState([]);
  const [lineGraphSlectedCity, setLineGraphSelectedCity] = useState([
    "hydrabad",
  ]);
  const [isComparisonEnable, setIsComparisonEnable] = useState(false);

  useEffect(() => {
    getCountByCity();
    getPropertyCountInCity();
  }, [lineGraphSlectedCity, isComparisonEnable]);

  const getCountByCity = async () => {
    let result = await axios(
      `http://localhost:3001/hotels/countbycity?cities=delhi,hydrabad,vizag`
    );
    setHotelCountInCityData(result.data);
    console.log(result.data, "pie_chart_data");
  };

  const getPropertyCountInCity = async () => {
    let result = await axios(
      `http://localhost:3001/hotels/OverAllcountbytypeandcity?cities=${lineGraphSlectedCity.join(
        ","
      )}`
    );
    setPropertyCountInCity(result.data);
    //console.log(result.data, "property count");
  };

  const handleChangeCity = (e, city) => {
    console.log(city, "triggered city");
    let x = city;
    if (e.target.checked && isComparisonEnable) {
      setLineGraphSelectedCity([...lineGraphSlectedCity, city]);
    } else if (!e.target.checked && isComparisonEnable) {
      let filteredCities = lineGraphSlectedCity.filter((c) => {
        return c !== x;
      });
      setLineGraphSelectedCity(filteredCities);
    }
  };

  return (
    <Container>
      <Row>
        <Col sm={12} lg={6}>
          <div>
            <h4 style={{ minWidth: 400 }}> No of properties in each city</h4>
            <MUIChartsPractice data={hotelCountInCityData} />
          </div>
        </Col>
        {propertyCountInCity ? (
          <Col sm={12} lg={6}>
            <div>
              <h4 style={{ minWidth: 400 }}>
                No of different type of properties in city
              </h4>
              <MUILineChart
                LineChartData={propertyCountInCity}
                isComparisonEnable={isComparisonEnable}
                getPropertyCountInCity={getPropertyCountInCity}
              />
            </div>
            {!isComparisonEnable ? (
              <div className="d-flex justify-content-evenly w-75">
                <div className="radio_btn_container">
                  <input
                    type="radio"
                    name="cities"
                    onChange={(e) =>
                      e.target.checked && setLineGraphSelectedCity(["vizag"])
                    }
                  />
                  <label className="radio_btn_label">Vizag</label>
                </div>
                <div className="radio_btn_container">
                  <input
                    type="radio"
                    name="cities"
                    checked={lineGraphSlectedCity.includes("hydrabad")}
                    onChange={(e) =>
                      e.target.checked && setLineGraphSelectedCity(["hydrabad"])
                    }
                  />
                  <label className="radio_btn_label">Hyderabad</label>
                </div>
                <div className="radio_btn_container">
                  <input
                    type="radio"
                    name="cities"
                    onChange={(e) =>
                      e.target.checked && setLineGraphSelectedCity(["delhi"])
                    }
                  />
                  <label className="radio_btn_label">Delhi</label>
                </div>
              </div>
            ) : null}

            {isComparisonEnable ? (
              <div className="d-flex justify-content-evenly w-75">
                <div className="radio_btn_container">
                  <input
                    type="checkbox"
                    // onChange={(e) =>
                    //   e.target.checked &&
                    //   setLineGraphSelectedCity([
                    //     ...lineGraphSlectedCity,
                    //     "vizag",
                    //   ])
                    // }
                    onChange={(e) => handleChangeCity(e, "vizag")}
                  />
                  <label className="radio_btn_label">Vizag</label>
                </div>
                <div className="radio_btn_container">
                  <input
                    type="checkbox"
                    // checked={lineGraphSlectedCity.includes("hydrabad")}
                    // onChange={(e) =>
                    //   e.target.checked &&
                    //   setLineGraphSelectedCity([
                    //     ...lineGraphSlectedCity,
                    //     "hydrabad",
                    //   ])
                    // }
                    onChange={(e) => handleChangeCity(e, "hydrabad")}
                  />
                  <label className="radio_btn_label">Hyderabad</label>
                </div>
                <div className="radio_btn_container">
                  <input
                    type="checkbox"
                    // onChange={(e) =>
                    //   e.target.checked &&
                    //   setLineGraphSelectedCity([
                    //     ...lineGraphSlectedCity,
                    //     "delhi",
                    //   ])
                    // }
                    onChange={(e) => handleChangeCity(e, "delhi")}
                  />
                  <label className="radio_btn_label">Delhi</label>
                </div>
              </div>
            ) : null}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "24px",
              }}
            >
              <span>compare with other_cities</span>
              <Switch
                onChange={(e) => setIsComparisonEnable(e.target.checked)}
              />
            </div>
          </Col>
        ) : null}
      </Row>
    </Container>
  );
};

export default Analytics;
