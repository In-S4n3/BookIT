import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateEvent from "./CreateEvent";

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

  return (
    <div>
      <div style={{float: 'left'}}>
        {state.map((event) => {
          return (
            <div key={event._id}>
              <h3>{event.name}</h3>
              <p>{event.date}</p>
              <p>{event.hour}</p>
            </div>
          );
        })}
      </div>
      <div style={{float: 'right'}}>
        <CreateEvent />
      </div>
    </div>
  );
};

export default EventsList;
