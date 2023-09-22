import { Card, Col, Container, Row } from "react-bootstrap";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { GiSmartphone } from "react-icons/gi";
import { FaFacebookF } from "react-icons/fa";
import { SiPinterest } from "react-icons/si";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import downloadImg from "../../images/download-removebg-preview.png";

export default function Footer() {
  return (
    <Container fluid className="py-5" style={{ background: "#40407a" }}>
      <Container className="">
        <Row className="pt-3">
          <Col
            sm={12}
            md={4}
            lg={4}
            className="mb-3 pe-3 pt-0 text-start text-light"
          >
            <Card.Title as={"h1"} className="mb-3 fw-bold">
              me<span className="fw-bold text-danger">U</span>p
            </Card.Title>
            <Card.Text className="mb-3 fw-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
              dolores voluptate accusantium illum, libero perferendis.
            </Card.Text>
            <Card.Text>
              <FaFacebookF className="me-3 fs-6" />
              <SiPinterest className="mx-3 fs-6" />
              <BsInstagram className="mx-3 fs-6" />
              <BsTwitter className="mx-3 fs-6" />
            </Card.Text>
          </Col>
          <Col sm={12} md={2} lg={2} className="mb-3 text-light text-start">
            <Card.Title className="mb-3 fw-bold">About Us</Card.Title>
            <Card.Text className="mb-3">About Us</Card.Text>
            <Card.Text className="mb-3">Submit Event</Card.Text>
            <Card.Text className="mb-3">All Events</Card.Text>
            <Card.Text className="">All Locations</Card.Text>
          </Col>
          <Col sm={12} md={4} lg={4} className="mb-3 text-light text-start">
            <Card.Title className="mb-3 fw-bold">Contact Us</Card.Title>
            <Card.Text className="mb-3">
              <CiLocationOn className="fs-4" />
              Block-14, Gulistan-e-Johar, Karachi
            </Card.Text>
            <Card.Text className="mb-3 ">
              <AiOutlineMail className="fs-5" /> smshoaib2001@gmail.com
            </Card.Text>
            <Card.Text className="">
              <GiSmartphone className="fs-4 me-0" />
              124567890
            </Card.Text>
          </Col>
          <Col sm={12} md={2} lg={2} className="mb-3 text-light text-start">
            <Card.Title className="mb-3 fw-bold ms-2">Download App</Card.Title>
            <Card.Img
              variant="top"
              src={downloadImg}
              className="ps-0 ms-0"
              style={{ cursor: "pointer" }}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
