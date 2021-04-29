import React from "react";
import { Link } from "react-router-dom";
import "../EventList/EventList.scss";
import "bulma/css/bulma.css";

const EventsList = ({state, deleteEvent, cuisine}) => {
  
  let renderEvents = () => {
    console.log(cuisine);
    return (
      <div className="event-list">
        {cuisine.length !== 0 ? <></> : state
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
    );
  };

  return (
    <div className="events">
      {renderEvents()}
    </div>
  );
};

export default EventsList;
