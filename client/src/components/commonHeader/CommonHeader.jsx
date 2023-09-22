import "./CommonHeader.css";
import { Card, Container } from "react-bootstrap";

export default function CommonHeader({ heading, ht }) {
  return (
    <>
      <Container
        fluid
        className="common-header py-0 mt-0"
        style={{ height: ht }}
      >
        <Card.Header className="fs-3 text-light fw-semibold">
          {heading}
        </Card.Header>
      </Container>
    </>
  );
}
