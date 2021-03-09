import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateEvent = ({ getEvents }) => {
  const [state, setstate] = useState([]);
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setEventName] = useState("");
  const [date, setEventDate] = useState("");
  const [hour, setEventHour] = useState("");
  const [restaurantChoosen, setrestaurantChoosen] = useState({});
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
      url: `https://developers.zomato.com/api/v2.1/search?entity_id=${location}&entity_type=city&q=${cuisine}&count=12`,
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
    let priceForTwo = restaurantChoosen.average_cost_for_two
    let restaurantFoodImg = restaurantChoosen.featured_image
    
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

  //console.log(state);
  //console.log(restaurantChoosen);

  return (
    <div>
      <form onSubmit={createEvent}>
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
        <h3>{restaurantChoosen?.name}</h3>
        <p>{restaurantChoosen?.location?.address}</p>
        {(location.length !== 0) & (cuisine.length !== 0) ? (
          <input type="submit" value="Submit" />
        ) : (
          <div>Choose where and what you want to eat</div>
        )}
      </form>
      <br />
      {hideForm && (
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
        </form>
      )}
      <br />
      {error && <div>{error.message}</div>}
      {isLoaded & (state.length === 0) ? (
        <div>Loading...</div>
      ) : (
        hideRestaurantes &&
        state.map((item) => (
          <div key={item.restaurant.id}>
            <button
              onClick={() => choosenRestaurant(item.restaurant)}
              style={{
                backgroundImage: `url(${item.restaurant.featured_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#d4f7ff",
              }}
            >
              <h3>{item.restaurant.name}</h3>
              <p>{item.restaurant.location.address}</p>
              <p>{item.restaurant.average_cost_for_two}€</p>
              <p>{item.restaurant.user_rating.aggregate_rating}</p>
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CreateEvent;
