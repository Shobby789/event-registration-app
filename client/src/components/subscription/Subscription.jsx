import { Form, Card, Container, InputGroup } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";

export default function Subscription() {
  return (
    <Container className="text-start text-dark py-3 my-5">
      <Card.Header as="h6" className="ms-3 fw-bold">
        Subscribe
      </Card.Header>
      <Container className="pt-2 px-0 d-flex justify-content-between align-items-center flex-wrap">
        <Card.Header as="h2" className="ms-3 fw-bold">
          Sign up for Newsletter!
        </Card.Header>
        <Form className="w-50">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter your email"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              className="rounded rounded-end-0 py-2 border-top-0 border-start-0 border-end-0"
            />
            <InputGroup.Text
              id="basic-addon2"
              className="border-top-0 border-start-0 border-end-0 text-danger fw-semibold"
              style={{ backgroundColor: "transparent", cursor: "pointer" }}
            >
              Subscribe <BsArrowRight className="ms-1" />
            </InputGroup.Text>
          </InputGroup>
        </Form>
      </Container>
    </Container>
  );
}
