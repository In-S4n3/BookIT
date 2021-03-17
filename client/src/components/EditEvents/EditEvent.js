import axios from "axios";
import React, { useState } from "react";

const EditEvent = (props) => {
  const [name, setEventName] = useState(props.eventData.name);
  const [date, setEventDate] = useState(props.eventData.date);
  const [hour, setEventHour] = useState(props.eventData.hour);

  let chooseEventName = (e) => {
    setEventName(e.target.value);
  };

  let chooseEventDate = (e) => {
    setEventDate(e.target.value);
  };

  let chooseEventHour = (e) => {
    setEventHour(e.target.value);
  };

  let handleFormEdit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/events/${props.eventId}`, {
        name,
        date,
        hour,
      })
      .then(() => {
        console.log("Event updated");
        props.parentProps.history.push("/events");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleFormEdit}>
        <label>Name of the Event</label>
        <br />
        <input type="text" value={name} onChange={chooseEventName} />
        <br />
        <br />
        <label>Date of the Event</label>
        <br />
        <input type="date" value={date} onChange={chooseEventDate} />
        <br />
        <br />
        <label>Time of the Event</label>
        <br />
        <input type="time" value={hour} onChange={chooseEventHour} />
        <br />
        <br />

        <input className="btn btn-success" type="submit" value="Submit" />
      </form>
      <br />
      <p>
        <strong>Note: </strong>to change the restaurant, please create a new
        event.
      </p>
    </div>
  );
};

export default EditEvent;
