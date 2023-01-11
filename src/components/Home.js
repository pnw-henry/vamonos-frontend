import React, { useState, useEffect } from "react";

function Home({ userID, isLoggedIn }) {
  const [user, setUser] = useState("");
  //Current user's trips and hotels
  const API = `http://localhost:9292/currentuser/${userID}`;

  useEffect(() => {
    if (isLoggedIn & (userID !== 0)) {
      fetch(API)
        .then((r) => r.json())
        .then((user) => setUser(user));
    }
  }, [isLoggedIn, userID, API]);

  return (
    <div className="home">
      <div className="home-trips">
        {isLoggedIn &&
        user !== "" &&
        user.trips != null &&
        user.trips.length > 0 ? (
          <div>
            <h2>Your Destinations</h2>
            {user.trips.map((trip) => {
              return <p key={trip.id}>{trip.destination}</p>;
            })}
            <h2>Your Hotels</h2>
            {user.trips.map((trip) => {
              if (trip.hotel != null) {
                return <p key={trip.id}>{trip.hotel.name}</p>;
              }
            })}
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default Home;
