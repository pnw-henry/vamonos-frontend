import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="nav=bar">
      <div className="nagivation">
        <br></br>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/trips">My Trips</NavLink>
        <NavLink to="/newtrip">New Trip</NavLink>
      </div>
    </div>
  );
}

export default Navigation;
