import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Menubar from "./components/navbar/Menubar";
import Home from "./pages/home/Home";
import AllEvents from "./pages/allEvents/AllEvents";
import GetTicket from "./pages/getTicket/GetTicket";
import CreateEvent from "./pages/createEvent/CreateEvent";
import EventDetails from "./pages/eventDetailsPage/EventDetails";
import MyEvents from "./pages/myEvents/MyEvents";
import CategorizedEvents from "./pages/categorizedEvents/CategorizedEvents";

function App() {
  return (
    <div className="App">
      <Menubar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all-events" element={<AllEvents />} />
        <Route path="/event-details/:_id" element={<EventDetails />} />
        <Route path="/:_id/get-ticket" element={<GetTicket />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/my-events/:_id" element={<MyEvents />} />
        <Route path="/:category" element={<CategorizedEvents />} />
      </Routes>
    </div>
  );
}

export default App;
