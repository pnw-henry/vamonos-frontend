import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="nav=bar">
      <div className="nagivation">
        <NavLink
          to="/"
          className={(isActive) =>
            "nav-link" + (!isActive ? " unselected" : "")
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/trips"
          className={(isActive) =>
            "nav-link" + (!isActive ? " unselected" : "")
          }
        >
          My Trips
        </NavLink>
        <NavLink
          to="/newtrip"
          className={(isActive) =>
            "nav-link" + (!isActive ? " unselected" : "")
          }
        >
          New Trip
        </NavLink>
      </div>
    </div>
  );
}

export default Navigation;
