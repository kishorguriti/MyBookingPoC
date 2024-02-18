import React, { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import "./header.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ type }) => {
  const navigatesTo = useNavigate();
  const [destination, setDestination] = useState("vizag");
  const [ShowCalender, setShowCalender] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDateInp, setShowDateInp] = useState(true);

  let today = new Date();
  let nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate() + 1);

  const [people, setPeople] = useState({
    adult: 1,
    children: 0,
    rooms: 1,
  });

  const [date, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: nextDay || new Date(),

      key: "selection",
    },
  ]);
  // setSelectedDates(date);

  function seeFulldetailsofHotel() {
    navigatesTo(
      `/Booking.com/hotels?searchresults.en-gb.html?&city=${destination.toLowerCase()}&type=all&adult=${
        people.adult
      }&child=${people.children}&rooms=${people.rooms}&from=${
        date[0].startDate
      }&to=${date[0].endDate}`,
      {
        state: { destination, people, date },
      }
    );
  }

  const toggleingInpuCal = () => {
    setShowCalender(!ShowCalender);
    setShowOptions(false);
  };
  const toggleOptions = () => {
    setShowCalender(false);
    setShowOptions(!showOptions);
  };

  return (
    <>
      <Container
        className={type !== "list" ? "header" : "header_notList"}
        fluid
      >
        <Container className="d-flex justify-content-between">
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faBed} className="icon-style" />
            <span className="icon-name"> Stays</span>
          </div>
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faPlane} className="icon-style" />
            <span className="icon-name"> Flights</span>
          </div>
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faCar} className="icon-style" />
            <span className="icon-name"> Car rentals</span>
          </div>
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faBed} className="icon-style" />
            <span className="icon-name"> Attractions</span>
          </div>
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faTaxi} className="icon-style" />
            <span className="icon-name"> Airport taxis</span>
          </div>
        </Container>
        {type !== "list" && (
          <>
            <Container>
              <h3 style={{ color: "white", marginTop: "25px" }}>
                A lifetime of discounts? it's Genius
              </h3>
              <p style={{ color: "white", marginTop: "24px" }}>
                Get rewarded for your-travels unlock instant savings of 10% or
                more with a free Booking Account
              </p>
            </Container>
          </>
        )}
      </Container>

      {type !== "list" && (
        <Container className="header-input-contianer mt-1">
          <div className="input-field-container">
            <div className="input_align_style">
              <FontAwesomeIcon icon={faBed} className="input-icon-style" />
              <input
                type="search"
                className="input-field"
                placeholder="Where are you going?"
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
              />
            </div>
            <div className="input_align_style">
              <span htmlFor="calender">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="input-icon-style"
                />
              </span>
              <input
                className="input-field"
                onClick={() => toggleingInpuCal()}
                onChange={(item) => setDateRange([item.selection])}
                id="calender"
                placeholder={`${format(
                  date[0].startDate,
                  "dd/MM/yyy"
                )} to ${format(date[0].endDate, "dd/MM/yyyy")}`}
                value={`${format(date[0].startDate, "dd/MM/yyy")} to ${format(
                  date[0].endDate,
                  "dd/MM/yyyy"
                )}`}
              />
            </div>
            {ShowCalender && (
              <DateRange
                className="datePicker"
                editableDateInputs={true}
                onChange={(item) => setDateRange([item.selection])}
                minDate={new Date()}
                moveRangeOnFirstSelection={false}
                ranges={date}
              />
            )}
            <div className="input_align_style">
              <FontAwesomeIcon icon={faPerson} className="input-icon-style" />
              <input
                onClick={() => toggleOptions()}
                className="input-field"
                placeholder={`${people.adult} adults . ${people.children}  children . ${people.rooms} rooms`}
              />
            </div>
            {showOptions && (
              <div className="SelectingPeople">
                <div className="optionsItem">
                  <div>Adult</div>
                  <div className="optoonsCountContainer">
                    <button
                      disabled={people.adult <= 1}
                      className="btnStyle"
                      onClick={() =>
                        setPeople({ ...people, adult: people.adult - 1 })
                      }
                    >
                      -
                    </button>
                    <span>{people.adult}</span>
                    <button
                      className="btnStyle"
                      onClick={() =>
                        setPeople({ ...people, adult: people.adult + 1 })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionsItem">
                  <div>children</div>
                  <div className="optoonsCountContainer">
                    <button
                      disabled={people.children <= 0}
                      className="btnStyle"
                      onClick={() =>
                        setPeople({ ...people, children: people.children - 1 })
                      }
                    >
                      -
                    </button>
                    <span>{people.children}</span>
                    <button
                      className="btnStyle"
                      onClick={() =>
                        setPeople({ ...people, children: people.children + 1 })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionsItem">
                  <div>rooms</div>
                  <div className="optoonsCountContainer">
                    <button
                      className="btnStyle"
                      disabled={people.rooms <= 1}
                      onClick={() =>
                        setPeople({ ...people, rooms: people.rooms - 1 })
                      }
                    >
                      -
                    </button>
                    <span>{people.rooms}</span>
                    <button
                      className="btnStyle"
                      onClick={() =>
                        setPeople({ ...people, rooms: people.rooms + 1 })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div>
              <button className="search-btn" onClick={seeFulldetailsofHotel}>
                Search
              </button>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Header;
