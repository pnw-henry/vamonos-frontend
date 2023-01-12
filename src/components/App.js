import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import UserLogin from "./UserLogin";
import Navigation from "./Navigation";
import NewTrip from "./NewTrip";
import Trips from "./Trips";
import Hotels from "./Hotels";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [user, setUser] = useState(0);
  const [trips, setTrips] = useState([]);
  const [hotels, setHotels] = useState([]);
  const hotelAPI = "http://localhost:9292/hotels";

  useEffect(() => {
    fetch(hotelAPI)
      .then((r) => r.json())
      .then((hotels) => {
        setHotels(hotels);
      });
  }, []);

  useEffect(() => {
    if (userLogin) {
      const userTrips = user.trips.map((trip) => {
        return trip;
      });
      setTrips(userTrips);
    }
  }, [user]);

  return (
    <div className="app">
      <Header currentUser={user} />
      <Navigation />
      <UserLogin
        loginState={userLogin}
        onUserLogin={setUserLogin}
        onUserSelect={setUser}
      />
      <Hotels hotels={hotels} />
      <Routes>
        <Route
          path="/trips"
          element={
            <Trips
              isLoggedIn={userLogin}
              trips={trips}
              onSetTrips={setTrips}
              hotels={hotels}
            />
          }
        ></Route>
        <Route
          path="/newtrip"
          element={
            <NewTrip
              userID={user.id}
              isLoggedIn={userLogin}
              onSetTrips={setTrips}
              trips={trips}
            />
          }
        ></Route>
        <Route
          exact
          path="/"
          element={<Home user={user} isLoggedIn={userLogin} trips={trips} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
