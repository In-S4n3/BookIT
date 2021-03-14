import React from 'react'
import { Card } from "react-bootstrap";


const RestaurantsList = ({state, choosenRestaurant}) => {
  return (
    <div>
      {state.map((item) => (
          <div key={item.restaurant.id}>
            <button onClick={() => choosenRestaurant(item.restaurant)}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`${item.restaurant.featured_image}`}
                />
                <Card.Body>
                  <Card.Title>{item.restaurant.name}</Card.Title>
                  <Card.Text>
                    <p>{item.restaurant.location.address}</p>
                    <p>{item.restaurant.average_cost_for_two}€</p>
                    <p>{item.restaurant.user_rating.aggregate_rating}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </button>
          </div>
        ))}
    </div>
  )
}

export default RestaurantsList
