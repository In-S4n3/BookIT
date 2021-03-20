import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";
import "bulma/css/bulma.css";
import RestaurantsList from "../RestaurantsList/RestaurantsList";

const CreateEvent = ({ getEvents }) => {
  const [state, setstate] = useState([]);
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setEventName] = useState("");
  const [date, setEventDate] = useState("");
  const [hour, setEventHour] = useState("");
  const [restaurantChoosen, setrestaurantChoosen] = useState(null);
  const [hideForm, sethideForm] = useState(true);
  const [hideRestaurantes, setHideRestaurants] = useState(true);

  let chooseEventName = (e) => {
    setEventName(e.target.value);
  };

  let chooseEventDate = (e) => {
    setEventDate(e.target.value);
  };

  let chooseEventHour = (e) => {
    setEventHour(e.target.value);
  };

  let chooseLocation = (e) => {
    setLocation(e.target.value);
  };

  let chooseCuisine = (e) => {
    setCuisine(e.target.value);
    setIsLoaded(true);
  };

  useEffect(() => {
    if (cuisine.length !== 0) {
      zomatoApiCall();
    }
  }, [cuisine]);

  let choosenRestaurant = (restaurant) => {
    setrestaurantChoosen(restaurant);
    sethideForm(false);
    setHideRestaurants(false);
  };

  let zomatoApiCall = () => {
    axios({
      method: "GET",
      url: `https://developers.zomato.com/api/v2.1/search?entity_id=${location}&entity_type=city&q=${cuisine}&count=16`,
      headers: {
        "user-key": process.env.REACT_APP_ZOMATO_API_KEY,
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

  let createEvent = (e) => {
    e.preventDefault();
    let restaurantName = restaurantChoosen?.name;
    let restaurantAddress = restaurantChoosen?.location?.address;
    let priceForTwo = restaurantChoosen.average_cost_for_two;
    let restaurantFoodImg = restaurantChoosen.featured_image;

    axios
      .post("http://localhost:5000/api/events", {
        name,
        date,
        hour,
        restaurantName,
        restaurantAddress,
        priceForTwo,
        restaurantFoodImg,
      })
      .then(() => {
        setEventName("");
        setEventDate("");
        setEventHour("");
        setLocation("");
        setCuisine("");
        setrestaurantChoosen({});
        getEvents();
        sethideForm(true);
      })
      .catch((error) => setError(error));
  };

  let renderForms = () => {
    return (
      <div className="createEvent-container">
        <form onSubmit={createEvent}>
          <label className="label">Name of the Event</label>
          <input
            className="input is-rounded"
            type="text"
            value={name}
            onChange={chooseEventName}
          />
          <br />
          <br />
          <label className="label">Date of the Event</label>
          <input
            className="input is-rounded"
            type="date"
            value={date}
            onChange={chooseEventDate}
          />
          <br />
          <br />
          <label className="label">Time of the Event</label>
          <input
            className="input is-rounded"
            type="time"
            value={hour}
            onChange={chooseEventHour}
          />
          <br />
          <br />
          <h3>{restaurantChoosen?.name}</h3>
          <p>{restaurantChoosen?.location?.address}</p>
          {(location.length !== 0) & (cuisine.length !== 0) ? (
            <input type="submit" value="Submit" />
          ) : (
            <div style={{color: "white"}}>Choose where and what you want to eat</div>
          )}
        </form>
        <br />
        {hideForm && (
          <form>
            <label className="label">City of the Event: </label>
            <div className="select is-rounded">
              <select type="text" value={location} onChange={chooseLocation}>
                <option>Select a City</option>
                <option value="82">Lisboa</option>
                <option value="311">Porto</option>
                <option value="61">London</option>
                <option value="280">New York</option>
                <option value="306">San Francisco</option>
              </select>
            </div>
            <br />
            <br />
            <label className="label">Type of Cuisine: </label>
            <div className="select is-rounded">
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
            </div>
          </form>
        )}
      </div>
    );
  };

  let hideFormsOrNot = () => {
    if ((cuisine.length === 0) & (restaurantChoosen === null)) {
      return renderForms();
    } else if (restaurantChoosen !== null) {
      return renderForms();
    }
  };

  //console.log(state);
  //console.log(restaurantChoosen);

  return (
    <div className="createEvent-container">
      {hideFormsOrNot()}
      <br />
      {error && <Alert variant="danger">{error.message}</Alert>}
      {isLoaded & (state.length === 0) ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        hideRestaurantes && (
          <RestaurantsList
            state={state}
            choosenRestaurant={choosenRestaurant}
          />
        )
      )}
    </div>
  );
};

export default CreateEvent;
