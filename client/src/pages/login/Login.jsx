import { Container } from "react-bootstrap";
import "./Login.css";
import CommonHeader from "../../components/commonHeader/CommonHeader";
import LoginForm from "../../components/loginForm/LoginForm";

export default function Login() {
  return (
    <Container fluid className="px-0 pb-5">
      <CommonHeader heading={"Home > Sign In"} ht={"50vh"} />
      <Container className="pb-3">
        <LoginForm />
      </Container>
    </Container>
  );
}
