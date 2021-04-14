import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateEvent from "../CreatEvent/CreateEvent";
import { Link } from "react-router-dom";
import "../EventList/EventList.scss";
import "bulma/css/bulma.css";

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
    <div className="event-list-page-container">
      <div className="event-list">
        {state
          .sort(function (a, b) {
            if (a.date > b.date) {
              return 1;
            }
            if (a.date < b.date) {
              return -1;
            }
            return 0;
          })
          .map((event) => {
            return (
              <div key={event._id} className="single-event">
                <article className="message is-dark">
                  <div className="message-header">
                    <Link to={`events/${event._id}`}>
                      <p>{event.name}</p>
                    </Link>
                    <button
                      className="delete"
                      aria-label="delete"
                      onClick={() => deleteEvent(event._id)}
                    ></button>
                  </div>

                  <div className="message-body">
                    <p>
                      <span>Date:</span> {event.date}
                    </p>
                    <p>
                      <span>Hour:</span> {event.hour}
                    </p>
                    <p>
                      <span>Restaurant:</span> {event.restaurantName}
                    </p>
                    <p>
                      <span>Address:</span> {event.restaurantAddress}
                    </p>
                  </div>
                </article>
              </div>
            );
          })}
      </div>
      <div className="create-event">
        <CreateEvent getEvents={getAllEvents} />
      </div>
    </div>
  );
};

export default EventsList;
