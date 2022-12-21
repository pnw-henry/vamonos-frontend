import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import UserLogin from "./UserLogin";
import Navigation from "./Navigation";
import NewTrip from "./NewTrip";
import Trips from "./Trips";

function App() {
  const [users, setUsers] = useState([]);
  const [userLogin, setUserLogin] = useState(false);
  const [userID, setUserID] = useState(0);
  const userAPI = "http://localhost:9292/users";

  useEffect(() => {
    fetch(userAPI)
      .then((r) => r.json())
      .then((users) => setUsers(users));
  }, []);

  const currentUser = users.find((user) => {
    return user.id === userID;
  });

  return (
    <div className="app">
      <Header currentUser={currentUser} />
      <Navigation />
      <UserLogin
        loginState={userLogin}
        onUserLogin={setUserLogin}
        users={users}
        onUserSelect={setUserID}
        userID={userID}
      />
      <Routes>
        <Route
          path="/trips"
          element={<Trips userID={userID} isLoggedIn={userLogin} />}
        ></Route>
        <Route
          path="/newtrip"
          element={<NewTrip userID={userID} isLoggedIn={userLogin} />}
        ></Route>
        <Route
          exact
          path="/"
          element={<Home userID={userID} isLoggedIn={userLogin} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
