import React, { useState, useEffect } from "react";
import TripList from "./TripList";
function Trips({ userID, isLoggedIn }) {
  const [userTrips, setUserTrips] = useState([]);
  const [hotels, setHotels] = useState([]);
  const userTripsAPI = `http://localhost:9292/users/${userID}`;
  const hotelsAPI = "http://localhost:9292/hotels";

  console.log("Trips component rendering");

  useEffect(() => {
    if (isLoggedIn) {
      fetch(userTripsAPI)
        .then((r) => r.json())
        .then((trips) => setUserTrips(trips));

      fetch(hotelsAPI)
        .then((r) => r.json())
        .then((trips) => setHotels(trips));
    }
  }, [isLoggedIn]);

  console.log("User Trips: ", userTrips);
  console.log("Hotels: ", hotels);

  function onDeleteTrip(deletedTrip) {
    console.log("trip deleted: ", deletedTrip);
    const filteredTrips = userTrips.filter((trip) => trip !== deletedTrip);
    console.log("user trips after delete: ", userTrips);
    setUserTrips(filteredTrips);
  }

  function onAddHotel(hotel) {
    console.log("added hotel: ", hotel);
    setHotels([...hotels, hotel]);
  }

  function onTripUpdate(trip) {
    console.log("updated trip: ", trip);
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
        hotels={hotels}
        onDeleteTrip={onDeleteTrip}
        onAddHotel={onAddHotel}
        onTripUpdate={onTripUpdate}
      />
    </div>
  );
}

export default Trips;
