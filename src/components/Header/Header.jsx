export function Header() {
  const handleClick = () => {
    // Scroll hacia el inicio de la página al hacer click en el header
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  return (
    <div className="header-wrapper" onClick={handleClick}>
      <h1>
        <span className="blue-span">Soft</span>
        <span className="white-span">GPL</span>
      </h1>
    </div>
  );
}

export default Header;
