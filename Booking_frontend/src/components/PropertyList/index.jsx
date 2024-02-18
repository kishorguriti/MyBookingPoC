// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import "./style.css";
// import MyCustomHook from "../../Hooks/hook";

// function PropertyList() {
//   const { data, loading, error } = MyCustomHook(
//     "http://localhost:3001/hotels/countbytype"
//   );

//   return (
//     <>
//       <div className="property-container mt-3">
//         <div className="d-flex flex-column">
//           <div className="onhover">
//             <img
//               src="https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//               className="property-image"
//             />
//           </div>
//           <h5 className="property-name-style">Hotels</h5>
//           <p>{data.length > 0 ? data[0].hotelCount : "no data"} Properties</p>
//         </div>
//         <div className="d-flex flex-column">
//           <div className="onhover">
//             <img
//               src="https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//               className="property-image"
//             />
//           </div>
//           <h5 className="property-name-style">Apartments</h5>
//           <p>
//             {data.length > 0 ? data[0].apartmentCount : "no data"} Properties
//           </p>
//         </div>

//         <div className="d-flex flex-column">
//           <div className="onhover">
//             <img
//               src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/222673017.jpg?k=f2634ac5ace7ac2c838528232617ba63b29f08fb27cd8154767a9fb654976ed7&o=&hp=1"
//               className="property-image"
//             />
//           </div>
//           <h5 className="property-name-style">Resorts</h5>
//           <p>{data.length > 0 ? data[0].resortCount : "no data"} Properties</p>
//         </div>
//         <div className="d-flex flex-column">
//           <div className="onhover">
//             <img
//               src="https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//               className="property-image"
//             />
//           </div>
//           <h5 className="property-name-style">Villas</h5>
//           <p>{data.length > 0 ? data[0].villaCount : "no data"} Properties</p>
//         </div>
//         <div className="d-flex flex-column">
//           <div className="onhover">
//             <img
//               src="https://images.pexels.com/photos/206648/pexels-photo-206648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//               className="property-image"
//             />
//           </div>
//           <h5 className="property-name-style">Cabins</h5>
//           <p>{data.length > 0 ? data[0].cabinCount : "no data"} Properties</p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PropertyList;

//-----------------------after modification---------------------

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./style.css";
import MyCustomHook from "../../Hooks/hook";

function PropertyList() {
  const { data, loading, error } = MyCustomHook(
    "http://localhost:3001/hotels/countbytype"
  );

  return (
    <>
      <Container>
        <Row>
          <Col sm={12} md={6} lg={4}>
            <div>
              <img
                src="https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="property_img_style"
              />
            </div>
            <div className="d-flex justify-content-between mt-1">
              <h5 className="property-name-style">Hotels</h5>
              <p>
                {data.length > 0 ? data[0].hotelCount : "no data"} Properties
              </p>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <div>
              <img
                src="https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="property_img_style"
              />
            </div>
            <div className="d-flex justify-content-between mt-1">
              <h5 className="property-name-style">Apartments</h5>
              <p>
                {data.length > 0 ? data[0].apartmentCount : "no data"}
                Properties
              </p>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <div>
              <img
                src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/222673017.jpg?k=f2634ac5ace7ac2c838528232617ba63b29f08fb27cd8154767a9fb654976ed7&o=&hp=1"
                className="property_img_style"
              />
            </div>
            <div className="d-flex justify-content-between mt-1">
              <h5 className="property-name-style">Resorts</h5>
              <p>
                {data.length > 0 ? data[0].resortCount : "no data"} Properties
              </p>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <div>
              <img
                src="https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="property_img_style"
              />
            </div>
            <div className="d-flex justify-content-between mt-1">
              <h5 className="property-name-style">Villas</h5>

              <p>
                {data.length > 0 ? data[0].villaCount : "no data"} Properties
              </p>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <div>
              <img
                src="https://images.pexels.com/photos/206648/pexels-photo-206648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="property_img_style"
              />
            </div>
            <div className="d-flex justify-content-between mt-1">
              <h5 className="property-name-style">Cabins</h5>
              <p>
                {data.length > 0 ? data[0].cabinCount : "no data"} Properties
              </p>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <div>
              <img
                src="https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="property_img_style"
              />
            </div>
            <div className="d-flex justify-content-between mt-1">
              <h5 className="property-name-style">Cabins</h5>
              <p>
                {data.length > 0 ? data[0].cabinCount : "no data"} Properties
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PropertyList;
