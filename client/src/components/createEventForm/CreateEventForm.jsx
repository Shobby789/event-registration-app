import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./CreateEventForm.css";
import { useState } from "react";
import axios from "axios";

export default function CreateEventForm() {
  const loggedInUser = JSON.parse(localStorage.getItem("userDetails"));
  const [eventImg, setEventImg] = useState("");
  const [eventData, setEventData] = useState({
    eventTitle: "",
    discussionTopic: "",
    eventType: "",
    eventDate: "",
    eventImage: "",
    summary: "",
    location: "",
  });
  const {
    eventTitle,
    discussionTopic,
    eventType,
    eventDate,
    eventTime,
    summary,
    location,
  } = eventData;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEventData((values) => ({ ...values, [name]: value }));
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("eventCreator", loggedInUser?.user?._id);
      formData.append("eventTitle", eventTitle);
      formData.append("discussionTopic", discussionTopic);
      formData.append("eventType", eventType);
      formData.append("eventDate", eventDate);
      formData.append("eventTime", eventTime);
      formData.append("eventImage", eventImg);
      formData.append("summary", summary);
      formData.append("location", location);
      const res = await axios.post(
        "http://localhost:2001/api/createEvent",
        formData,
        {
          headers: { Authorization: loggedInUser?.token },
        }
      );
      console.log("create event res >> ", res.data.status);
      setEventData({
        eventTitle: "",
        discussionTopic: "",
        eventType: "",
        eventDate: "",
        eventImage: "",
        summary: "",
        location: "",
      });
      setEventImg("");
      setTimeout(() => {
        alert(res.data.status);
      }, 300);
    } catch (error) {
      console.log("createEvent error >> ", error);
    }
  };

  const canelEvent = () => {
    setEventData({
      eventTitle: "",
      discussionTopic: "",
      eventType: "",
      eventDate: "",
      eventImage: "",
      summary: "",
      location: "",
    });
    setEventImg("");
    setTimeout(() => {
      alert("Event canelled");
    }, 400);
  };
  return (
    <Container className="py-5 d-flex align-items-center justify-content-center">
      <Form onSubmit={createEvent} className="createEventForm">
        <Card.Header as={"h3"} className="fw-bold mb-4">
          Create An Event
        </Card.Header>
        <Row className="">
          <Col sm={12} md={6} lg={6} className="mb-3">
            <Form.Group className="text-start">
              <Form.Label htmlFor="eventTitle">Event Title</Form.Label>
              <Form.Control
                type="text"
                id="eventTitle"
                name="eventTitle"
                value={eventTitle}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={12} md={6} lg={6} className="mb-3">
            <Form.Group className="text-start">
              <Form.Label htmlFor="discussionTopic">
                Topic of Discussion
              </Form.Label>
              <Form.Control
                type="text"
                id="discussionTopic"
                name="discussionTopic"
                value={discussionTopic}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6} lg={6} className="mb-3">
            <Form.Group className="text-start">
              <Form.Label htmlFor="eventType">Event Type</Form.Label>
              <Form.Select
                aria-label=""
                id="eventType"
                name="eventType"
                value={eventType}
                onChange={handleChange}
              >
                <option>Select a type</option>
                <option value="Business">Business</option>
                <option value="Concert">Concert</option>
                <option value="Sports">Sports</option>
                <option value="Conference">Conference</option>
                <option value="Festival">Festival</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm={12} md={6} lg={6} className="mb-3">
            <Form.Group className="text-start">
              <Form.Label htmlFor="eventDate">Event Date</Form.Label>
              <Form.Control
                type="date"
                id="eventDate"
                name="eventDate"
                value={eventDate}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6} lg={6} className="mb-3">
            <Form.Group className="text-start">
              <Form.Label htmlFor="eventTime">Event Time</Form.Label>
              <Form.Control
                type="time"
                id="eventTime"
                name="eventTime"
                value={eventTime}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={12} md={6} lg={6} className="mb-3">
            <Form.Group className="text-start">
              <Form.Label htmlFor="eventImage">Upload one Image</Form.Label>
              <Form.Control
                type="file"
                id="eventImage"
                name="eventImage"
                onChange={(e) => setEventImg(e.target.files[0])}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="mb-3">
            <Form.Group className="text-start">
              <Form.Label htmlFor="location">Event Location</Form.Label>
              <Form.Control
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col sm={12} md={12} lg={12}>
            <Form.Group className="text-start">
              <Form.Label htmlFor="summary">Short summary of event</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="summary"
                name="summary"
                value={summary}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="secondary" className="px-4 me-2" onClick={canelEvent}>
          Cancel
        </Button>
        <Button variant="danger" className="px-4 ms-1" onClick={createEvent}>
          Create
        </Button>
      </Form>
    </Container>
  );
}
