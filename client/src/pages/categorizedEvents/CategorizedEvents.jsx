import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CommonHeader from "../../components/commonHeader/CommonHeader";
import { useParams } from "react-router-dom";
import UpcomingEventCard from "../../components/upcomingEventCard/UpcomingEventCard";

export default function CategorizedEvents() {
  const { category } = useParams();
  const [events, setEvents] = useState([]);
  console.log("Category >> ", category);
  console.log("events >> ", events.length);
  const getDetails = async () => {
    try {
      const res = await fetch(`http://localhost:2001/api/${category}`, {
        method: "GET",
      });
      const response = await res.json();
      setEvents(response);
      // console.log("category resp >> ", response);
      // if (response !== null) {
      //   setEvents(response);
      // }
    } catch (error) {
      console.log("category error >> ", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <Container fluid className="px-0 bg-light min-vh-100">
      <CommonHeader heading={`Home > ${category} Events`} ht={"70vh"} />
      <Container className="py-5 d-flex align-items-center justify-content-start">
        {events.length > 0 ? (
          <>
            {events.map(
              ({
                _id,
                eventTitle,
                eventTime,
                eventDate,
                eventType,
                eventImage,
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
                  />
                );
              }
            )}
          </>
        ) : (
          <></>
        )}
      </Container>
    </Container>
  );
}
