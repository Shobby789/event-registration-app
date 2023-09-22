import { Link } from "react-router-dom";
import EventCardGrid from "../../components/eventCardGrid/EventCardGrid";
import Footer from "../../components/footer/Footer";
import Subscription from "../../components/subscription/Subscription";
import "./Home.css";
import { Card, Container, Button } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Container fluid className="hero-header">
        <Card.Header as={"h1"} className="text-light fw-bold main-heading mb-3">
          Connecting the world
        </Card.Header>
        <Card.Text className="text-light fs-2 mb-4">
          Let's register your event and let people join you
        </Card.Text>
        <Link
          to={"/all-events"}
          variant="danger"
          size="normal"
          className="btn btn-danger py-3 px-4 fw-semibold"
        >
          See All Events
        </Link>
      </Container>
      <EventCardGrid />
      <Subscription />
      <Footer />
    </>
  );
}
