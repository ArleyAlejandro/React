import { useContext } from "react";
import cartIcon from "../../assets/cart.png";
import ProductContext from "../../context/ProductContext"; // Importar el contexto

export function MainMenu() {
  const { cart } = useContext(ProductContext); // Acceder al carrito
 
  console.log({"Carrito después de agregar productos: " : cart});

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
          <img src={cartIcon} alt="cart icon" />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </div>
      </nav>
    </div>
  );
}

export default MainMenu;
