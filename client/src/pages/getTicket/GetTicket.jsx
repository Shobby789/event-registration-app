import React from "react";
import { Container } from "react-bootstrap";
import CommonHeader from "../../components/commonHeader/CommonHeader";
import Footer from "../../components/footer/Footer";
import TicketForm from "../../components/ticketForm/TicketForm";

export default function GetTicket() {
  return (
    <Container fluid className="px-0">
      <CommonHeader heading={"Home > Get Ticket"} ht={"70vh"} />
      <TicketForm />
      <Footer />
    </Container>
  );
}
