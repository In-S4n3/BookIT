import React, { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [state, setstate] = useState([]);
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventHour, setEventHour] = useState("");

  let chooseLocation = (e) => {
    setLocation(e.target.value);
  };

  let chooseCuisine = (e) => {
    setCuisine(e.target.value);
  };

  let chooseEventName = (e) => {
    setEventName(e.target.value);
  };

  let chooseEventDate = (e) => {
    setEventDate(e.target.value);
  };

  let chooseEventHour = (e) => {
    setEventHour(e.target.value);
  };

  let zomatoApiCall = () => {
    axios({
      method: "GET",
      url: `https://developers.zomato.com/api/v2.1/search?entity_id=${location}&entity_type=city&q=${cuisine}&count=9`,
      headers: {
        "user-key": "e5974e8939c8556291798f25f46fd433",
        "content-type": "application/json",
      },
    }).then(
      (result) => {
        setIsLoaded(true);
        setstate(result.data.restaurants);
      },
      (error) => {
        setError(error);
      }
    );
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    zomatoApiCall();
    setIsLoaded(true);
  };

  //console.log(state);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name of the Event</label>
        <br />
        <input type="text" value={eventName} onChange={chooseEventName} />
        <br />
        <br />
        <label>Date of the Event</label>
        <br />
        <input type="text" value={eventDate} onChange={chooseEventDate} />
        <br />
        <br />
        <label>Time of the Event</label>
        <br />
        <input type="text" value={eventHour} onChange={chooseEventHour} />
        <br />
        <br />
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
        <input className="btn btn-primary" type="submit" value="Search" />
      </form>
      {error && <div>{error.message}</div>}
      {isLoaded & (state.length === 0) ? (
        <div>Loading...</div>
      ) : (
        state.map((item) => (
          <div key={item.restaurant.id}>
            <h3>{item.restaurant.name}</h3>
            <p>{item.restaurant.location.address}</p>
            <p>{item.restaurant.average_cost_for_two}€</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CreateEvent;
