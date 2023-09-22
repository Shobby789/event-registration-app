import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import CommonHeader from "../../components/commonHeader/CommonHeader";
import Footer from "../../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";

export default function EventDetails() {
  const loeggedInUser = JSON.parse(localStorage.getItem("userDetails"));
  const [details, setDetails] = useState(null);
  const { _id } = useParams();
  const navigate = useNavigate();
  // console.log("details >> ", details);
  const getDetails = async () => {
    try {
      const res = await fetch(
        `http://localhost:2001/api/getEventDetails/${_id}`,
        {
          method: "GET",
        }
      );
      const response = await res.json();
      // console.log("getDetails >> ", response);
      if (response !== null) {
        setDetails(response);
      }
    } catch (error) {
      console.log("getDetails error >> ", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleNavigate = () => {
    if (loeggedInUser) {
      navigate(`/${_id}/get-ticket`);
    } else {
      navigate("/login");
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:2001/api/deleteEvent/${_id}`, {
      method: "DELETE",
    });
    const response = await res.json();
    setTimeout(() => {
      alert(response.status);
    }, 400);
  };

  return (
    <Container fluid className="px-0">
      <CommonHeader heading={"Home > Details"} ht={"70vh"} />
      <Container className="p-5 text-start">
        <Card.Header as="h2">{details?.eventType}</Card.Header>
        <Row className="py-5">
          <Col md={8}>
            <Card.Header as="h5" className="my-2">
              Title: {details?.eventTitle}
            </Card.Header>
            <Card.Header as="h5" className="my-2">
              Discussion Topic: {details?.discussionTopic}
            </Card.Header>
            <Card.Header as="h5" className="my-2">
              Event Date: {details?.eventDate}
            </Card.Header>
            <Card.Header as="h5" className="my-2">
              Event Time: {details?.eventTime}
            </Card.Header>
            {/* <Card.Header as="h5">A short summary:</Card.Header> */}
            <Card.Header as="h5" className="mb-4">
              {details?.summary}
            </Card.Header>
            {loeggedInUser?.user?._id === details?.eventCreator ? (
              <Button variant="danger" onClick={() => handleDelete()}>
                Delete Event
              </Button>
            ) : (
              <Button
                variant="danger"
                onClick={handleNavigate}
                // onClick={() => navigate(`/event-details/${_id}`)}
              >
                Get Ticket
              </Button>
            )}
          </Col>
          <Col md={4}>
            <Card.Img
              src={`http://localhost:2001/uploads/${details?.eventImage}`}
            ></Card.Img>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
}
