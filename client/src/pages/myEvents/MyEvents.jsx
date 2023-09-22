import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import CommonHeader from "../../components/commonHeader/CommonHeader";
import Footer from "../../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { CiClock2, CiLocationOn } from "react-icons/ci";

export default function MyEvents() {
  const [userEvents, setUserEvents] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("userDetails"));
  const { _id } = useParams();
  console.log("myId >> ", _id);

  const fetchMyEvents = async () => {
    try {
      const res = await fetch(`http://localhost:2001/api/meEvents/${_id}`, {
        method: "GET",
      });
      const resp = await res.json();
      // console.log("my events res >> ", resp);
      setUserEvents(resp);
    } catch (error) {
      console.log("My events error >> ", error);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, [userEvents]);

  const navigate = useNavigate();
  const fetchEventDetails = (_id) => {
    navigate(`/event-details/${_id}`);
  };

  return (
    <Container fluid className="px-0 bg-light">
      <CommonHeader heading={"My Events"} ht={"70vh"} />
      <Container className="py-5">
        <Container className="py-5 d-flex align-items-center justify-content-start flex-wrap">
          {userEvents.length > 0 ? (
            <>
              {userEvents.map(
                ({
                  _id,
                  eventTitle,
                  eventType,
                  eventDate,
                  eventTime,
                  eventImage,
                }) => {
                  return (
                    <Card
                      style={{ width: "22rem", cursor: "pointer" }}
                      key={_id}
                      className="border-0"
                      onClick={() => fetchEventDetails(_id)}
                    >
                      <Card.Img
                        variant="top"
                        src={`http://localhost:2001/uploads/${eventImage}`}
                      />
                      <Card.ImgOverlay className="text-start">
                        <Button variant="primary" size="sm" className="">
                          {eventType}
                        </Button>
                      </Card.ImgOverlay>
                      <Card.Body className="text-start">
                        <Card.Title className="fw-bold">
                          {eventTitle}
                        </Card.Title>
                        <Card.Text className="mb-1 text-secondary">
                          <CiClock2 /> {eventDate}, {eventTime}
                        </Card.Text>
                        <Card.Text className="text-secondary">
                          <CiLocationOn className="mb-1" /> Karachi, Sindh
                        </Card.Text>

                        {/* <Button
                          variant="warning"
                          size="sm"
                          className="fw-semibold me-1"
                          style={{ cursor: "pointer" }}
                        >
                          See Details
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="fw-semibold ms-1"
                          style={{ cursor: "pointer" }}
                        >
                          Delete
                        </Button> */}
                      </Card.Body>
                    </Card>
                  );
                }
              )}
            </>
          ) : (
            <Card.Header as={"h3"} className="text-dark fw-bold">
              No Events
            </Card.Header>
          )}
        </Container>
      </Container>
      <Footer />
    </Container>
  );
}
