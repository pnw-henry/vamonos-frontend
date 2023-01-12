import React, { useState, useEffect } from "react";
import TripList from "./TripList";
function Trips({ isLoggedIn, trips, onSetTrips, hotels }) {
  function sortTrips(trips) {
    const sortedTrips = trips.sort((a, b) => a.check_in - b.check_in);
    return sortedTrips;
  }

  function onDeleteTrip(deletedTrip) {
    const filteredTrips = trips.filter((trip) => trip.id !== deletedTrip.id);
    onSetTrips(sortTrips(filteredTrips));
  }

  function onTripUpdate(UpdatedTrip) {
    let filteredTrips = trips.filter((trip) => trip.id !== UpdatedTrip.id);
    filteredTrips.push(UpdatedTrip);
    onSetTrips(sortTrips(filteredTrips));
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
      {trips.length !== 0 ? (
        <TripList
          trips={trips}
          onDeleteTrip={onDeleteTrip}
          onTripUpdate={onTripUpdate}
          hotels={hotels}
        />
      ) : (
        <h3>Staying at home for a while?</h3>
      )}
    </div>
  );
}

export default Trips;
