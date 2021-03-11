import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateEvent from "../CreatEvent/CreateEvent";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../EventList/EventList.scss"

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
    <div className="event-list-container">
      <div className="event-list">
        {state.map((event) => {
          return (
            <div key={event._id} className='single-event'>
              <FaTimes
                style={{ color: "red", cursor: "pointer", float: "right" }}
                onClick={() => deleteEvent(event._id)}
              />
              <Link to={`events/${event._id}`} >
                <h3>{event.name}</h3>
                <p>Date: {event.date}</p>
                <p>Hour: {event.hour}</p>
                <p>Restaurant: {event.restaurantName}</p>
                <p>Address: {event.restaurantAddress}</p>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="create-form">
        <CreateEvent getEvents={getAllEvents} />
      </div>
    </div>
  );
};

export default EventsList;
