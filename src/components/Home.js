import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home({ userID, isLoggedIn }) {
  const [firstTrip, setFirstTrip] = useState("");
  const API = `http://localhost:9292/trips/first/${userID}`;

  useEffect(() => {
    if (isLoggedIn & (userID !== 0)) {
      fetch(API)
        .then((r) => r.json())
        .then((trip) => setFirstTrip(trip));
    }
  }, [isLoggedIn]);

  return (
    <div className="home">
      <div>
        {isLoggedIn && firstTrip !== "" ? (
          <div className="home-trips">
            <h3>Get ready for {firstTrip.destination}!</h3>
            <p>Check In: {firstTrip.check_in}</p>
            <p>Check Out: {firstTrip.check_out}</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        {isLoggedIn && firstTrip === "" ? (
          <div className="no-trips">
            <h3>You have no upcoming trips.</h3>
            <Link to="/newtrip">
              <h3>Add new trip?</h3>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Home;
