import { Container } from "react-bootstrap";
import "./Register.css";
import CommonHeader from "../../components/commonHeader/CommonHeader";
import RegisterForm from "../../components/registerForm/RegisterForm";

export default function Register() {
  return (
    <Container fluid className="px-0 pb-5">
      <CommonHeader heading={"Home > Register"} ht={"50vh"} />
      <Container className="pb-3">
        <RegisterForm />
      </Container>
    </Container>
  );
}
