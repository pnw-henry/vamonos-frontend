import React, { useState, useEffect } from "react";
import TripList from "./TripList";
function Trips({ userID, isLoggedIn }) {
  const [userTrips, setUserTrips] = useState([]);
  const userTripsAPI = `http://localhost:9292/users/${userID}`;

  useEffect(() => {
    if (isLoggedIn) {
      fetch(userTripsAPI)
        .then((r) => r.json())
        .then((trips) => setUserTrips(trips));
    }
  }, [isLoggedIn]);

  function onDeleteTrip(deletedTrip) {
    const filteredTrips = userTrips.filter(
      (trip) => trip.id !== deletedTrip.id
    );
    setUserTrips(filteredTrips);
  }

  function onTripUpdate(UpdatedTrip) {
    let filteredTrips = userTrips.filter((trip) => trip.id !== UpdatedTrip.id);
    filteredTrips.push(UpdatedTrip);
    setUserTrips(filteredTrips);
  }

  if (!isLoggedIn) {
    return (
      <div>
        <h3>Login or create a new account to see trip information. </h3>
      </div>
    );
  }

  return (
    <div className="tripspace">
      <TripList
        trips={userTrips}
        onDeleteTrip={onDeleteTrip}
        onTripUpdate={onTripUpdate}
      />
    </div>
  );
}

export default Trips;
