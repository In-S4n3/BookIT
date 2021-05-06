import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import EventsList from "../EventList/EventsList";
import CreateEvent from "../CreateEvent/CreateEvent";
import "../MainPage/MainPage.scss";

const MainPage = () => {
  const [state, setState] = useState([]);
  const [cuisine, setCuisine] = useState(null);

  let handleCuisine = (value) => setCuisine(value);

  let getAllEvents = () => {
    axios
      .get("http://localhost:5000/api/events")
      .then((responseFromApi) => setState(responseFromApi.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllEvents();
  }, [cuisine]);

  let deleteEvent = (eventId) => {
    axios
      .delete(`http://localhost:5000/api/events/${eventId}`)
      .then(() => {
        getAllEvents();
      })
      .catch((error) => {
        alert(error);
      });
  };

  //let time = new Date().getHours() + ":" + new Date().getMinutes();
  state.map((item) => {
    let hour = Number(item.hour.replace(":", "").slice(0, 2));
    let minute = Number(item.hour.replace(":", "").slice(2, 4));
    let eventHour = new Date();
    eventHour.setHours(hour, minute);
    let eventDate = new Date(item.date);
    if ((eventDate < new Date()) & (eventHour < new Date())) {
      deleteEvent(item._id);
    }
  });

  return (
    <div className="main-container">
      <div className="event-list">
        <EventsList state={state} deleteEvent={deleteEvent} cuisine={cuisine} />
      </div>
      <div className="create-events-form">
        <CreateEvent getEvents={getAllEvents} handleCuisine={handleCuisine} />
      </div>
    </div>
  );
};

export default MainPage;
