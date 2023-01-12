import React, { useState } from "react";

function UserLogin({ loginState, onUserLogin, users, onUserSelect }) {
  const [userName, setUserName] = useState("");
  const [newUser, setNewUser] = useState("");
  const [existingUser, setExistingUser] = useState("");
  const userAPI = "http://localhost:9292/users";
  const userSearchAPI = `http://localhost:9292//user/search/${userName}`;

  function handleLoginChange(e) {
    setUserName(e.target.value);
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

      console.log("userobject", newUserObj);

      fetch(userAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserObj),
      })
        .then((r) => {
          console.log(r);
          r.json();
        })
        .then((user) => {
          console.log(user);
          if (user) {
            console.log("inside if", user);
          } else {
            console.log("inside else", user);
            /*onUserLogin(true);
            onUserSelect(user.id);
            setUserName(user.username);*/
          }
        });
    } else {
      alert("Invalid Username. Try again");
    }
  }

  function handleExistingUserSubmit(e) {
    e.preventDefault();

    const userFound = users.find((user) => {
      return user.username.toLowerCase() === userName.toLowerCase();
    });

    if (userFound) {
      onUserLogin(true);
      onUserSelect(userFound.id);
    } else {
      alert("User Not Found");
    }
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
                value={userName}
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
