import "./EventCard.css";
import { Card } from "react-bootstrap";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

export default function EventCard({ title, click }) {
  const navigate = useNavigate();
  const fetchEventDetails = () => {
    navigate(`/${title}`);
  };
  return (
    <Card
      className="text-dark text-center py-4 mb-4 eventCard"
      onClick={fetchEventDetails}
    >
      <LiaBusinessTimeSolid className="text-center mx-auto fs-1 mt-3 text-danger" />
      <Card.Body>
        <Card.Title as="h5" className="fw-bold">
          {title}
        </Card.Title>
        <Card.Text className="text-secondary fs-6">Events</Card.Text>
      </Card.Body>
    </Card>
  );
}
