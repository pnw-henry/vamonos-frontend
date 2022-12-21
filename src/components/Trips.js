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

  function sortTrips(trips) {
    const sortedTrips = trips.sort((a, b) => a.check_in - b.check_in);
    return sortedTrips;
  }

  function onDeleteTrip(deletedTrip) {
    const filteredTrips = userTrips.filter(
      (trip) => trip.id !== deletedTrip.id
    );
    setUserTrips(sortTrips(filteredTrips));
  }

  function onTripUpdate(UpdatedTrip) {
    let filteredTrips = userTrips.filter((trip) => trip.id !== UpdatedTrip.id);
    filteredTrips.push(UpdatedTrip);
    setUserTrips(sortTrips(filteredTrips));
  }

  if (!isLoggedIn) {
    return (
      <div>
        <h3>Login or create a new account to see trip information. </h3>
      </div>
    );
  }

  console.log("User Trips: ", userTrips);

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
