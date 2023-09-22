import { useState } from "react";
import "./TicketForm.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length < 3) {
    errors.firstName = "Name must contain 3 letters";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length < 3) {
    errors.firstName = "Last Name must contain 3 letters";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!values.email.includes("@")) {
    errors.email = "Enter a valid email address";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.length < 11) {
    errors.phone = "Enter a valid phone number";
  }

  if (!values.address) {
    errors.address = "Required";
  } else if (values.address.length < 10) {
    errors.address = "Enter complete address";
  }

  if (!values.city) {
    errors.city = "Required";
  } else if (values.city.length < 5) {
    errors.city = "Enter a valid city";
  }

  if (!values.state) {
    errors.state = "Required";
  } else if (values.state.length < 4) {
    errors.state = "Enter a valid state";
  }

  if (!values.zipCode) {
    errors.zipCode = "Required";
  } else if (values.zipCode.length < 4) {
    errors.zipCode = "Enter a valid zip code";
  }

  if (!values.howDidHear) {
    errors.howDidHear = "Please choose one option";
  }

  return errors;
};

export default function TicketForm() {
  const { _id } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem("userDetails"));
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      howDidHear: "",
    },
    validate,
    onSubmit: async () => {
      try {
        const res = await fetch(`http://localhost:2001/api/${_id}/bookTicket`, {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            userId: loggedInUser?.user?._id,
            firstName: formik.values.firstName,
            lastName: formik.values.lastName,
            email: formik.values.email,
            phone: formik.values.phone,
            address: formik.values.address,
            city: formik.values.city,
            state: formik.values.state,
            zipCode: formik.values.zipCode,
            howDidHear: formik.values.howDidHear,
          }),
        });
        const response = await res.json();
        console.log("Book ticket res >> ", response);
        formik.values.firstName = "";
        formik.values.lastName = "";
        formik.values.email = "";
        formik.values.phone = "";
        formik.values.address = "";
        formik.values.city = "";
        formik.values.state = "";
        formik.values.zipCode = "";
        formik.values.howDidHear = "";
        setTimeout(() => {
          alert(response.status);
        }, 300);
      } catch (error) {
        console.log("book ticket error >> ", error);
      }
    },
  });

  return (
    <Container className="px-0 py-5 d-flex algin-items-center justify-content-center">
      <Form className="ticketForm">
        <Card.Header as="h4" className="fw-bold mb-5">
          Webinar Registration Form
        </Card.Header>
        <Row className="mb-3 px-3">
          <Col sm={12} md={6} lg={6} className="mb-3">
            <Form.Group className="text-start">
              <Form.Label htmlFor="firstName">First Name</Form.Label>
              <Form.Control
                type="text"
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="fs-6 text-danger ps-2">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </Form.Group>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <Form.Group className="text-start">
              <Form.Label htmlFor="lastName">Last Name</Form.Label>
              <Form.Control
                type="text"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="fs-6 text-danger ps-2">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3 px-3">
          <Col sm={12} md={6} lg={6} className="mb-3">
            <Form.Group className="text-start">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="fs-6 text-danger ps-2">
                  {formik.errors.email}
                </div>
              ) : null}
            </Form.Group>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <Form.Group className="text-start">
              <Form.Label htmlFor="phone">Phone</Form.Label>
              <Form.Control
                type="text"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="fs-6 text-danger ps-2">
                  {formik.errors.phone}
                </div>
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3 px-3">
          <Col sm={12} md={12} lg={12}>
            <Form.Group className="text-start">
              <Form.Label htmlFor="address">Address</Form.Label>
              <Form.Control
                type="text"
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="fs-6 text-danger ps-2">
                  {formik.errors.address}
                </div>
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3 px-3">
          <Col sm={12} md={6} lg={6} className="mb-3">
            <Form.Group className="text-start">
              <Form.Label htmlFor="city">City</Form.Label>
              <Form.Control
                type="text"
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="fs-6 text-danger ps-2">
                  {formik.errors.city}
                </div>
              ) : null}
            </Form.Group>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <Form.Group className="text-start">
              <Form.Label htmlFor="state">State</Form.Label>
              <Form.Control
                type="text"
                id="state"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
              />
              {formik.touched.state && formik.errors.state ? (
                <div className="fs-6 text-danger ps-2">
                  {formik.errors.state}
                </div>
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3 px-3">
          <Col sm={12} md={12} lg={12}>
            <Form.Group className="text-start">
              <Form.Label htmlFor="zipCode">Postal / Zip Code</Form.Label>
              <Form.Control
                type="text"
                id="zipCode"
                name="zipCode"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
              />
              {formik.touched.zipCode && formik.errors.zipCode ? (
                <div className="fs-6 text-danger ps-2">
                  {formik.errors.zipCode}
                </div>
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-5 px-3">
          <Col sm={12} md={12} lg={12}>
            <Form.Group className="text-start">
              <Form.Label>How did you hear about us?</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className=""
                name="howDidHear"
                value={formik.values.howDidHear}
                onChange={formik.handleChange}
              >
                <option value={"Social Media"}>Social Media</option>
                <option value={"Advertisement"}>Advertisement</option>
                <option value={"Friend"}>Friend</option>
                <option value={"Other"}>Other</option>
              </Form.Select>
              {formik.touched.howDidHear && formik.errors.howDidHear ? (
                <div className="fs-6 text-danger ps-2">
                  {formik.errors.howDidHear}
                </div>
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Button variant="danger" className="px-4" onClick={formik.handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}
