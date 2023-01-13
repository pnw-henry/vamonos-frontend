import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewTrip({ userID, isLoggedIn, onSetTrips, trips }) {
  const today = new Date();
  const [departing, setDeparting] = useState(today);
  const [returning, setReturning] = useState(today);
  console.log("start date", departing);
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

  function handleCheckIn(e) {
    const check_in = e.toISOString().split("T")[0];
    console.log("calendar select check in", check_in);
    setTripForm({
      ...tripForm,
      check_in: check_in,
    });
  }

  function handleCheckOut(e) {
    const check_out = e.toISOString().split("T")[0];
    console.log("calendar select check out", check_out);
    setTripForm({
      ...tripForm,
      check_out: check_out,
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
        onSetTrips([...trips, newTrip]);
        alert("Added new trip!");
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
            <h2>Departing:</h2>
            <DatePicker
              selected={departing}
              onSelect={handleCheckIn}
              onChange={(date) => {
                setDeparting(date);
              }}
            />
            <br></br>
            <h2>Returning:</h2>
            <DatePicker
              selected={returning}
              onSelect={handleCheckOut}
              onChange={(date) => {
                setReturning(date);
              }}
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
