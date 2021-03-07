import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateEvent from "./CreateEvent";
import { FaTimes } from "react-icons/fa";

const EventsList = () => {
  const [state, setState] = useState([]);

  let getAllEvents = () => {
    axios
      .get("http://localhost:5000/api/events")
      .then((responseFromApi) => setState(responseFromApi.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

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

  return (
    <div>
      <div style={{ float: "left", margin: "55px" }}>
        {state.map((event) => {
          return (
            <div key={event._id}>
              <FaTimes
                style={{ color: "red", cursor: "pointer", float: "right" }}
                onClick={() => deleteEvent(event._id)}
              />
              <h3>{event.name}</h3>
              <p>{event.date}</p>
              <p>{event.hour}</p>
              <p>{event.restaurantName}</p>
              <p>{event.restaurantAddress}</p>
            </div>
          );
        })}
      </div>
      <div style={{ float: "right", margin: "55px" }}>
        <CreateEvent getEvents={getAllEvents} />
      </div>
    </div>
  );
};

export default EventsList;
