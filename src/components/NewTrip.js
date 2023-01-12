import React, { useState } from "react";

function NewTrip({ userID, isLoggedIn, onSetTrips, trips }) {
  const [tripForm, setTripForm] = useState({
    destination: "",
    cost: "",
    check_in: "",
    check_out: "",
    user_id: null,
    hotel_id: null,
  });

  const tripAPI = "http://localhost:9292/trips";

  function handleTripChange(e) {
    setTripForm({
      ...tripForm,
      [e.target.name]: e.target.value,
    });
  }

  function handleTripSubmit(e) {
    e.preventDefault();

    const newTrip = {
      destination: tripForm.destination,
      cost: tripForm.cost,
      check_in: tripForm.check_in,
      check_out: tripForm.check_out,
      user_id: userID,
      hotel_id: null,
    };

    fetch(tripAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTrip),
    })
      .then((r) => r.json())
      .then((newTrip) => {
        console.log("new trip", newTrip);
        onSetTrips([...trips, newTrip]);
      });
  }

  return (
    <div>
      {!isLoggedIn ? (
        <h3>You must have an existing account to create new trips.</h3>
      ) : (
        <div className="form-container">
          <h2>Where to?</h2>
          <form className="new-trip-form" onSubmit={handleTripSubmit}>
            <input
              name="destination"
              type="text"
              placeholder="Destination"
              value={tripForm.destination}
              onChange={handleTripChange}
            />
            <br></br>
            <input
              name="cost"
              type="number"
              placeholder="Cost"
              value={tripForm.cost}
              onChange={handleTripChange}
            />
            <br></br>
            <input
              name="check_in"
              type="text"
              placeholder="Check In Date YYYY/MM/DD"
              value={tripForm.check_in}
              onChange={handleTripChange}
            />
            <br></br>
            <input
              name="check_out"
              type="text"
              placeholder="Check Out Date YYYY/MM/DD"
              value={tripForm.check_out}
              onChange={handleTripChange}
            />
            <br></br>
            <button type="submit" className="submit-trip-button">
              Add Trip!
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default NewTrip;
