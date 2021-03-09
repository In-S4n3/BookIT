import axios from "axios";
import React, { useState } from "react";

const EditEvent = ({ eventData, eventId }) => {
  const [name, setEventName] = useState(eventData.name);
  const [date, setEventDate] = useState(eventData.date);
  const [hour, setEventHour] = useState(eventData.hour);

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
      .put(`http://localhost:5000/api/events/${eventId}`, { name, date, hour })
      .then(() => console.log("Event updated"))
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

        <input type="submit" value="Submit" />
      </form>
      <br />
      <p>
        <strong>Note: </strong>to change the restaurant, please create a new
        event.
      </p>
      {/* {hideForm && (
        <form>
          <label>City of the Event: </label>
          <br />
          <select type="text" value={location} onChange={chooseLocation}>
            <option>Select a City</option>
            <option value="82">Lisboa</option>
            <option value="311">Porto</option>
            <option value="61">London</option>
            <option value="280">New York</option>
            <option value="306">San Francisco</option>
          </select>
          <br />
          <br />
          <label>Type of Cuisine: </label>
          <br />
          <select type="text" value={cuisine} onChange={chooseCuisine}>
            <option>Select a Cuisine</option>
            <option value="portuguese">Portuguese</option>
            <option value="brasilian">Brasilian</option>
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="american">American</option>
            <option value="chinese">Chinese</option>
            <option value="indian">Indian</option>
          </select>
          <br />
        </form>)} */}
    </div>
  );
};

export default EditEvent;
