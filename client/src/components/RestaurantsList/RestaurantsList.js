import React from "react";
import "../RestaurantsList/RestaurantsList.scss";

const RestaurantsList = ({ restaurantsFromApi, choosenRestaurant }) => {
  return (
    <div className="restaurantList-container">
      {restaurantsFromApi.map((item) => (
        <div key={item.restaurant.id} className="restaurantList-items">
          <ul>
            <button
              onClick={() => choosenRestaurant(item.restaurant)}
              style={{
                backgroundImage: `url(${item.restaurant.featured_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="restaurants"
            >
              <h3><span>{item.restaurant.name}</span></h3>
              <p>{item.restaurant.location.address}</p>
              <p>{item.restaurant.average_cost_for_two}€</p>
              <p>{item.restaurant.user_rating.aggregate_rating}</p>
            </button>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RestaurantsList;
