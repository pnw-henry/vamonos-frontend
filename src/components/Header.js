import Logo from "./Logo";
function Header({ currentUser }) {
  return (
    <header>
      <Logo />
      <h1>Vamonos</h1>
      <h3 className="username">
        {currentUser ? `Hi ${currentUser.username}!` : ""}
      </h3>
    </header>
  );
}

export default Header;
