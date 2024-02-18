import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faEye,faEyeSlash,} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { ValidateLogin, ValidateRegister } from "../../Validations/validations";
import "./style.css";

function Login(props) {
  const [openReg, setOpenReg] = useState(false);
  const [regResponse, setRegResponse] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const Loginformik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { isValid, errors } = await ValidateLogin(values);

      if (isValid) {
        fetch("http://localhost:3001/users/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (!res.Error) {
              props.onHide();
              props.notification("login succuss!", "succuss");
              const { createdAt, updatedAt, ...userDetails } = res;

              localStorage.setItem("loggedUser", JSON.stringify(res.user[0]));
            } else {
              throw Error(res.Error);
            }
          })
          .catch((err) => {
            console.log(err, "cathc");
            props.notification(`${err}`, "fail");
          });
      } else {
        Loginformik.setErrors(errors);
      }
    },
  });

  const RegisterFormik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { isValid, errors } = await ValidateRegister(values);
      if (isValid) {
        fetch("http://localhost:3001/users/register", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            console.log(res, "from res");
            if (!res.Error) {
              props.onHide();
              props.notification("Registration succuss!", "succuss");
            } else {
              throw Error(res.Error);
            }
          })
          .catch((err) => {
            console.log(err, "cathc");
            props.notification(`${err}`, "fail");
          });
      } else {
        RegisterFormik.setErrors(errors);
      }
    },
  });

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title
                id="contained-modal-title-vcenter"
                className="text-center"
              >
                {!openReg ? <span>Login</span> : <span>Register</span>}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {!openReg ? (
                <>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="floatingInputCustom"
                      type="text"
                      placeholder="username"
                      name="username"
                      onChange={Loginformik.handleChange("username")}
                      value={Loginformik.values.username}
                    />
                    <label htmlFor="floatingInputCustom">User Name</label>
                    <Form.Text>
                      {Loginformik.touched.username &&
                      Loginformik.errors.username ? (
                        <p className="text-danger mt-2">
                          {Loginformik.errors.username}
                        </p>
                      ) : (
                        <p> </p>
                      )}
                    </Form.Text>
                  </Form.Floating>

                  <Form.Floating>
                    <Form.Control
                      id="floatingPasswordCustom"
                      type={hidePassword ? "password" : "text"}
                      placeholder="Password"
                      name="password"
                      onChange={Loginformik.handleChange("password")}
                      value={Loginformik.values.password}
                    />
                    <label htmlFor="floatingPasswordCustom">Password</label>
                    <div
                      style={{
                        position: "absolute",
                        right: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() => setHidePassword(!hidePassword)}
                    >
                      {hidePassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </div>
                    <Form.Text>
                      {Loginformik.touched.password &&
                      Loginformik.errors.password ? (
                        <p className="text-danger">
                          {Loginformik.errors.password}
                        </p>
                      ) : (
                        <p> </p>
                      )}
                    </Form.Text>
                  </Form.Floating>

                  {/* {!invalidUser && <p className="text-danger">{error}</p>} */}
                </>
              ) : (
                <>
                  <FloatingLabel
                    controlId="floatingUserName"
                    label="username"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="username"
                      name="username"
                      onChange={RegisterFormik.handleChange("username")}
                    />
                    <Form.Text>
                      {RegisterFormik.touched.username &&
                      RegisterFormik.errors.username ? (
                        <p className="text-danger">
                          {RegisterFormik.errors.username}
                        </p>
                      ) : (
                        <p> </p>
                      )}
                    </Form.Text>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      onChange={RegisterFormik.handleChange("email")}
                    />
                    <Form.Text>
                      {RegisterFormik.touched.email &&
                      RegisterFormik.errors.email ? (
                        <p className="text-danger">
                          {RegisterFormik.errors.email}
                        </p>
                      ) : (
                        <p> </p>
                      )}
                    </Form.Text>
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control
                      type={hidePassword ? "password" : "text"}
                      placeholder="Password"
                      name="password"
                      onChange={RegisterFormik.handleChange("password")}
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() => setHidePassword(!hidePassword)}
                    >
                      {hidePassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </div>
                    <Form.Text>
                      {RegisterFormik.touched.password &&
                      RegisterFormik.errors.password ? (
                        <p className="text-danger">
                          {RegisterFormik.errors.password}
                        </p>
                      ) : (
                        <p> </p>
                      )}
                    </Form.Text>
                  </FloatingLabel>
                  <p className="text-danger">{regResponse}</p>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              {!openReg && (
                <>
                  <Button onClick={Loginformik.handleSubmit}>Login</Button>
                  <span
                    className="text-success"
                    onClick={() => [setOpenReg(true), setHidePassword(true)]}
                  >
                    Register
                  </span>
                </>
              )}
              {/* <Button onClick={props.onHide}>Close</Button> */}

              {/* 
        //-------------------------------------------- */}
              {openReg && (
                <>
                  <Button onClick={RegisterFormik.handleSubmit}>
                    Register
                  </Button>
                  <span
                    className="text-primary"
                    onClick={() => [setOpenReg(false), setHidePassword(true)]}
                  >
                    Already have Account?
                  </span>
                </>
              )}
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
