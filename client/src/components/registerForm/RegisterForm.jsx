import { Link, useNavigate } from "react-router-dom";
import { Card, Container, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!values.email.includes("@")) {
    errors.email = "Enter valid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 5) {
    errors.password = "Password must be greater than 5 characters";
  }

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

  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.length < 11) {
    errors.phone = "Enter a valid phone number";
  }

  if (!values.job) {
    errors.job = "Required";
  }

  // if (!values.address) {
  //   errors.address = "Required";
  // } else if (values.address.length < 10) {
  //   errors.address = "Enter complete address";
  // }
  return errors;
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      job: "",
      // address: "",
    },
    validate,
    onSubmit: async () => {
      // e.preventDefault();
      try {
        const res = await fetch("http://localhost:2001/api/register", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email: formik.values.email,
            password: formik.values.password,
            firstName: formik.values.firstName,
            lastName: formik.values.lastName,
            phone: formik.values.phone,
            job: formik.values.job,
            // address: formik.values.address,
          }),
        });
        const response = await res.json();
        setTimeout(() => {
          alert(response.status);
          navigate("/login");
        }, 300);
        console.log("register api res >> ", response);
      } catch (error) {
        console.log("register api error >>> ", error);
      }
    },
  });
  return (
    <Container className="d-flex algin-items-center justify-content-center pt-5">
      <Form
        onSubmit={formik.handleSubmit}
        className="text-start mt-5 loginForm"
      >
        <Card.Header as="h3" className="fw-bold mb-3">
          Sign Up
        </Card.Header>
        <div className="underline"></div>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="py-2"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fs-6 text-danger ps-2">{formik.errors.email}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            className="py-2"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="fs-6 text-danger ps-2">
              {formik.errors.firstName}
            </div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            className="py-2"
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="fs-6 text-danger ps-2">
              {formik.errors.lastName}
            </div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="py-2"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="fs-6 text-danger ps-2">{formik.errors.phone}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            id="job"
            name="job"
            placeholder="Job"
            value={formik.values.job}
            onChange={formik.handleChange}
            className="py-2"
          />
          {formik.touched.job && formik.errors.job ? (
            <div className="fs-6 text-danger ps-2">{formik.errors.job}</div>
          ) : null}
        </Form.Group>
        {/* <Form.Group className="mb-3">
          <Form.Control
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            className="py-2"
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="fs-6 text-danger ps-2">{formik.errors.address}</div>
          ) : null}
        </Form.Group> */}
        <Form.Group className="mb-4">
          <Form.Control
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="py-2"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fs-6 text-danger ps-2">
              {formik.errors.password}
            </div>
          ) : null}
        </Form.Group>
        <Form.Group className="my-3">
          <Button variant="danger" type="Submit" className="px-4 pb-2">
            Sign Up
          </Button>
        </Form.Group>
        <Form.Group>
          <Card.Text className="text-secondary">
            Already have an account?
            <Link
              to="/login"
              className="text-danger fw-semibold text-decoration-none ms-1"
            >
              Login
            </Link>
          </Card.Text>
        </Form.Group>
      </Form>
    </Container>
  );
}
