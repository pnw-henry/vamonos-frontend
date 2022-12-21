import React, { useState } from "react";

function UserLogin({ loginState, onUserLogin, users, onUserSelect, userID }) {
  const [userName, setUserName] = useState("");
  const [newUser, setNewUser] = useState("");
  const userAPI = "http://localhost:9292/users";

  function handleLoginChange(e) {
    setUserName(e.target.value);
  }

  function handleNewUserChange(e) {
    setNewUser(e.target.value);
  }

  function handleNewUserSubmit(e) {
    e.preventDefault();

    if (newUser.length > 3) {
      const newUserObj = {
        name: newUser,
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
          onUserLogin(true);
          onUserSelect(user.id);
          setUserName(user.name);
        });
    } else {
      alert("Invalid Username. Try again");
    }
  }

  function handleExistingUserSubmit(e) {
    e.preventDefault();

    const userFound = users.find((user) => {
      return user.name.toLowerCase() === userName.toLowerCase();
    });

    if (userFound) {
      onUserLogin(true);
      onUserSelect(userFound.id);
    } else {
      alert("User Not Found");
    }
  }

  function handleSignOut() {}

  return (
    <div className="login-container">
      {loginState ? (
        ""
      ) : (
        <div>
          <span>
            <h3>Get Started</h3>
            <form className="login-form" onSubmit={handleExistingUserSubmit}>
              <input
                value={userName}
                onChange={handleLoginChange}
                type="text"
                placeholder="Enter name..."
              />
              <br></br>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            <h3>Join Vamonos</h3>
            <form className="new-user-form" onSubmit={handleNewUserSubmit}>
              <input
                value={newUser}
                onChange={handleNewUserChange}
                type="text"
                placeholder="Enter name..."
              />
              <br></br>
              <button type="submit" className="new-user-button">
                Create Account
              </button>
            </form>
          </span>
        </div>
      )}
    </div>
  );
}

export default UserLogin;
