import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const EventDetails = (props) => {
  const [event, setEvent] = useState({});

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

  return (
    <div>
      <h1>{event.name}</h1>
    </div>
  );
};

export default EventDetails;
