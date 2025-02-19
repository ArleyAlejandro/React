import CartIcon from "./CartIcon";
import Items from "./Items";

 function MainMenu() {

  // console.log("render menu");

  return (
    <div className="main-menu">
      <nav className="nav">
        <Items></Items>
        <CartIcon />
      </nav>
    </div>
  );
}

export default MainMenu;
