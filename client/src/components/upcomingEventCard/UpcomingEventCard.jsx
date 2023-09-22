import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CiClock2, CiLocationOn } from "react-icons/ci";

export default function UpcomingEventCard({
  _id,
  title,
  time,
  date,
  eventImg,
  type,
  location,
}) {
  const navigate = useNavigate();
  const fetchEventDetails = () => {
    navigate(`/event-details/${_id}`);
  };

  return (
    <Card
      className="border-0 mb-4 mx-2"
      style={{ width: "20rem", cursor: "pointer" }}
      onClick={() => fetchEventDetails()}
    >
      <Card.Img variant="top" src={eventImg} className="rounded-top" />
      <Card.ImgOverlay className="text-start">
        <Button variant="primary" size="sm" className="">
          {type}
        </Button>
      </Card.ImgOverlay>
      <Card.Body className="text-start">
        <Card.Title className="mb-3">
          <Link to={"/"} className="text-decoration-none text-dark fw-bold">
            {title}
          </Link>
        </Card.Title>
        <Card.Text className="mb-1 text-secondary">
          <CiClock2 /> {date}, {time}
        </Card.Text>
        <Card.Text className="text-secondary">
          <CiLocationOn className="mb-1" /> {location}
        </Card.Text>
        <Button
          variant="danger"
          size="sm"
          className="rounded fw-semibold"
          onClick={() => fetchEventDetails()}
        >
          See Details
        </Button>
        <Card.Text className="text-danger fw-semibold float-end pt-1">
          $45.00 - $85.00
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
