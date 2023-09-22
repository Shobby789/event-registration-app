import React from "react";
import { Container } from "react-bootstrap";
import CommonHeader from "../../components/commonHeader/CommonHeader";
import Footer from "../../components/footer/Footer";
import CreateEventForm from "../../components/createEventForm/CreateEventForm";

export default function CreateEvent() {
  return (
    <Container fluid className="px-0">
      <CommonHeader heading={"Home > Create Event"} ht={"70vh"} />
      <Container fluid className="py-4">
        <CreateEventForm />
      </Container>
      <Footer />
    </Container>
  );
}
