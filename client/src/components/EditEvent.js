import React from 'react'

const EditEvent = (props) => {

let state = props.location.stateFromEventList?.state
console.log(state);
  
  return (
    <div>
      <form >
        <label>Name of the Event</label>
        <br />
        <input type="text"   />
        <br />
        <br />
        <label>Date of the Event</label>
        <br />
        <input type="date"   />
        <br />
        <br />
        <label>Time of the Event</label>
        <br />
        <input type="time"   />
        <br />
        <br />
        {/* <h3>{restaurantChoosen?.name}</h3>
        <p>{restaurantChoosen?.location?.address}</p>
        {(location.length !== 0) & (cuisine.length !== 0) ? (
          <input type="submit" value="Submit" />
        ) : (
          <div>Choose where and what you want to eat</div>
        )} */}
      </form>
      <br />
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
  )
}

export default EditEvent
