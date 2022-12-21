import React, { useState, useEffect } from "react";

function Home({ userID, isLoggedIn }) {
  const [firstTrip, setFirstTrip] = useState("");
  const API = `http://localhost:9292/trips/first/${userID}`;

  useEffect(() => {
    if (isLoggedIn) {
      fetch(API)
        .then((r) => r.json())
        .then((trip) => setFirstTrip(trip));
    }
  }, [isLoggedIn]);

  return (
    <div className="home">
      {isLoggedIn ? (
        <div className="home-trip">
          <h3>Get ready for {firstTrip.destination}</h3>
          <p>Check In: {firstTrip.check_in}</p>
          <p>Check Out: {firstTrip.check_out}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
