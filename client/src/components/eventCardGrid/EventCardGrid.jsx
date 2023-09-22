import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import EventCard from "../eventCard/EventCard";
import UpcomingEventCard from "../upcomingEventCard/UpcomingEventCard";
import { useNavigate } from "react-router-dom";

export default function EventCardGrid() {
  const event = [
    { id: 1, title: "Business" },
    { id: 2, title: "Concert" },
    { id: 3, title: "Sports" },
    { id: 4, title: "Conference" },
    { id: 5, title: "Festival" },
  ];
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  // console.log("events >> ", events);
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

  const fetchCategoryEvent = (category) => {
    const res = fetch(`http://localhost:2001/api/${category}`, {
      method: "GET",
    });
    console.log("res >> ", res.json());
  };

  const fetchEventDetails = (category) => {
    navigate(`/category/${category}`);
  };
  return (
    <>
      <Container fluid className="py-5">
        <Container className="py-5 d-flex align-items-center justify-content-evenly flex-wrap px-0">
          {event.map(({ id, title }) => {
            return (
              <EventCard
                key={id}
                title={title}
                click={() => fetchEventDetails(title)}
              />
            );
          })}
        </Container>
      </Container>
      {/* Upcoming Events */}
      <Container fluid className="bg-light py-5">
        <Container className="text-start py-4">
          <Card.Header as={"h3"} className="ms-3 mb-2 fw-bold">
            Upcoming Events
          </Card.Header>
          <Card.Text className=" text-secondary ms-3 mb-5">
            You can choose to display featured
          </Card.Text>
          {/* Upcoming event card */}
          <Container className="w-100 d-flex flex-wrap align-items-center justify-content-start">
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
      </Container>
    </>
  );
}

// {events.map(
//   ({
//     _id,
//     eventTitle,
//     eventTime,
//     eventDate,
//     eventType,
//     eventImage,
//   }) => {
//     return (
//       <UpcomingEventCard
//         _id={_id}
//         key={_id}
//         eventImg={eventImage}
//         title={eventTitle}
//         time={eventTime}
//         date={eventDate}
//         type={eventType}
//       />
//     );
//   }
// )}
