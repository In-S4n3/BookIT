import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import EditEvent from "../EditEvents/EditEvent";

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
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "250px",
        }}
      ></header>
      <div style={{ textAlign: "center" }}>
        <h2>{event.name}</h2>
        <h3>{event.restaurantName}</h3>
        <p>
          Average price for 2 persons: <strong>{event.priceForTwo}€</strong>
        </p>
        <p>Address: {event.restaurantAddress}</p>
        {showEditForm && <EditEvent parentProps={props} eventData={event} eventId={props.match.params.id}/>}
        <button onClick={showForm}>{!showEditForm ? 'Show' : 'Hide'} Edit Form</button>
      </div>
    </div>
  );
};

export default EventDetails;
