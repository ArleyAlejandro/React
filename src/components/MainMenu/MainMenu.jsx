import CartIcon from "./CartIcon";

 function MainMenu() {

  // console.log("render menu");

  return (
    <div className="main-menu">
      <nav className="nav">
        <ul>
          <li>HOME</li>
          <li>SOBRE NOSOTROS</li>
          <li>PRODUCTES</li>
          <li>PRACTICA 4</li>
          <li>CONTACTE</li>
        </ul>
        <CartIcon />
      </nav>
    </div>
  );
}

export default MainMenu;
