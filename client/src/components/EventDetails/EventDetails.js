import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditEvent from "../EditEvents/EditEvent";
import "./EventDetails.scss"

const EventDetails = (props) => {
  const [event, setEvent] = useState({});
  const [showEditForm, setshowEditForm] = useState(false);

  let getSingleEvent = () => {
    let eventId = props.match.params.id;
    axios
      .get(`http://localhost:5000/api/events/${eventId}`)
      .then((singleEvent) => setEvent(singleEvent.data))
      .catch((error) => alert(error));
  };

  useEffect(() => {
    getSingleEvent();
  }, []);

  let showForm = () => {
    showEditForm ? setshowEditForm(false) : setshowEditForm(true);
  };

  return (
    <div>
      <header
        style={{
          backgroundImage: `url(${event.restaurantFoodImg})`,
          backgroundSize: "percentage",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "250px",
        }}
      ></header>
      <br />
      <div className="details-container">
        <h2 className="h2">{event.name}</h2>
        <hr />
        <h3 className="h3">{event.restaurantName}</h3>
        <p>
          Average price for 2 persons: <strong>{event.priceForTwo}€</strong>
        </p>
        <p>Address: {event.restaurantAddress}</p>
        <br />
        {showEditForm && (
          <EditEvent
            parentProps={props}
            eventData={event}
            eventId={props.match.params.id}
          />
        )}
        <button className="btn btn-primary" onClick={showForm}>
          {!showEditForm ? "Show" : "Hide"} Edit Form
        </button>
        <br/>
        <br/>
        <Link to="/events">Events Page</Link>
        <br/>
        <br/>
      </div>
    </div>
  );
};

export default EventDetails;
