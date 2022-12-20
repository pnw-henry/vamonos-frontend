import Logo from "./Logo";
function Header({ currentUser }) {
  return (
    <header>
      <Logo />
      <h1>Vamonos</h1>
      <h3 className="username">
        {currentUser ? `Hi ${currentUser.name}!` : ""}
      </h3>
    </header>
  );
}

export default Header;
