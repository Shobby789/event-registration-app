import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CommonHeader from "../../components/commonHeader/CommonHeader";
import Footer from "../../components/footer/Footer";
import UpcomingEventCard from "../../components/upcomingEventCard/UpcomingEventCard";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const fetchEvents = async () => {
    try {
      await fetch("http://localhost:2001/api/getEvents", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setEvents(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [events]);

  return (
    <Container fluid className="px-0 bg-light">
      <CommonHeader heading={"Home > All Events"} ht={"70vh"} />
      <Container className="py-5 text-start">
        {/* <Card.Header as="h3" className="fw-bold">
          All Events
        </Card.Header> */}
        <Container className="py-5 d-flex flex-wrap align-items-center justify-content-start">
          {events.map(
            ({
              _id,
              eventTitle,
              eventTime,
              eventDate,
              eventType,
              eventImage,
              location,
            }) => {
              return (
                <UpcomingEventCard
                  _id={_id}
                  key={_id}
                  eventImg={`http://localhost:2001/uploads/${eventImage}`}
                  title={eventTitle}
                  time={eventTime}
                  date={eventDate}
                  type={eventType}
                  location={location}
                />
              );
            }
          )}
        </Container>
      </Container>
      <Footer />
    </Container>
  );
}
