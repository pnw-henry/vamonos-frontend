function Header({ currentUser }) {
  console.log("username inside header", currentUser);

  return (
    <header>
      <h1 className="logo">
        <strong>Vamonos</strong>
        <span className="logo-icon"> ✈️ </span>
      </h1>
      <h3 className="username">
        {currentUser ? `Hi ${currentUser.name}!` : "No User Logged In"}
      </h3>
    </header>
  );
}

export default Header;
