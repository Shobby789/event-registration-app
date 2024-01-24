import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { Card, Container, Form, Button } from "react-bootstrap";
import { setUser } from "../../features/authSlice/authSlice";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

export default function LoginForm({ labelName, inputType }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async () => {
      // e.preventDefault();
      try {
        const res = await fetch("http://localhost:2001/api/login", {
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
          }),
        });
        const response = await res.json();
        console.log("login api res >> ", response);
        dispatch(setUser(response.user));
        // setData({
        //   email: "",
        //   password: "",
        // });
        setTimeout(() => {
          alert(response.status);
          localStorage.setItem("userDetails", JSON.stringify(response.data));
          navigate("/");
        }, 400);
      } catch (error) {
        console.log("register api error >>> ", error);
      }
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Container className="d-flex algin-items-center justify-content-center pt-5">
      <Form
        onSubmit={formik.handleSubmit}
        className="text-start mt-5 loginForm"
      >
        <Card.Header as="h3" className="fw-bold mb-3">
          Sign In
        </Card.Header>
        <div className="underline"></div>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email" className="fw-semibold">
            {labelName}
          </Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="py-2"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fs-6 text-danger ps-2">{formik.errors.email}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password" className="fw-semibold">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
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
        <Form.Group className="my-4">
          <Button variant="danger" type="Submit" className="px-4 pb-2">
            Login
          </Button>
        </Form.Group>
        <Form.Group>
          <Card.Text className="text-secondary">
            <Link
              to="/register"
              className="text-secondary text-decoration-none me-1"
            >
              Register
            </Link>
            |
            <Link className="text-secondary text-decoration-none ms-1">
              Forgot password?
            </Link>
          </Card.Text>
        </Form.Group>
      </Form>
    </Container>
  );
}
