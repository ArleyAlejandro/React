import { useContext, useState } from "react";
import cartIcon from "../../assets/cart.png";
import ProductContext from "../../context/ProductContext"; // Importar el contexto
import CartContext from "../../context/CartContext";

export function MainMenu() {
  const { cart } = useContext(ProductContext); // Acceder al carrito
  const { setFullCart } = useContext(CartContext)

  const handleClick = (e) => {
    e.stopPropagation();

    // console.log("click");

    // Alternar el estado de fullCart correctamente
    setFullCart((prev) => !prev);

    // console.log("Estado antes del cambio:", fullCart);
  };

  return (
    <div className="main-menu">
      <nav>
        <ul>
          <li>HOME</li>
          <li>SOBRE NOSOTROS</li>
          <li>PRODUCTES</li>
          <li>PRACTICA 4</li>
          <li>CONTACTE</li>
        </ul>

        <div className="cart">
          <img src={cartIcon} alt="cart icon" onClick={handleClick} />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </div>
      </nav>
    </div>
  );
}

export default MainMenu;
