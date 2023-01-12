import React, { useState } from "react";

function UserLogin({ loginState, onUserLogin, onUserSelect }) {
  const [newUser, setNewUser] = useState("");
  const [existingUser, setExistingUser] = useState("");
  const userAPI = "http://localhost:9292/users";
  const userSearchAPI = `http://localhost:9292//user/search/${existingUser}`;

  function handleLoginChange(e) {
    setExistingUser(e.target.value);
  }

  function handleNewUserChange(e) {
    setNewUser(e.target.value);
  }

  function handleNewUserSubmit(e) {
    e.preventDefault();

    if (newUser.length > 2) {
      const newUserObj = {
        username: newUser,
      };

      fetch(userAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserObj),
      })
        .then((r) => r.json())
        .then((user) => {
          if (typeof user === "string") {
            alert(`${user} is taken!`);
          } else {
            onUserLogin(true);
            onUserSelect(user);
            setExistingUser(user.username);
          }
        });
    } else {
      alert("Invalid Username. Try again");
    }
  }

  function handleExistingUserSubmit(e) {
    e.preventDefault();

    fetch(userSearchAPI)
      .then((r) => r.json())
      .then((user) => {
        if (user) {
          onUserLogin(true);
          onUserSelect(user);
          setExistingUser(user.username);
        } else {
          alert("User Not Found");
        }
      });
  }

  return (
    <div className="login-container">
      {loginState ? (
        ""
      ) : (
        <div className="login-inputs">
          <div className="existing-user">
            <h3>Get Started</h3>
            <form className="login-form" onSubmit={handleExistingUserSubmit}>
              <input
                value={existingUser}
                onChange={handleLoginChange}
                type="text"
                placeholder="Enter username..."
              />
              <br></br>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
          <div className="new-user">
            <h3>Join Vamonos</h3>
            <form className="new-user-form" onSubmit={handleNewUserSubmit}>
              <input
                value={newUser}
                onChange={handleNewUserChange}
                type="text"
                placeholder="Choose a username..."
              />
              <br></br>
              <button type="submit" className="new-user-button">
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserLogin;
