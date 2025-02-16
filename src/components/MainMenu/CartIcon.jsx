import { useContext } from "react";
import cartIcon from "../../assets/cart.png";
import ProductContext from "../../context/ProductContext";
import CartContext from "../../context/CartContext";

const CartIcon = () => {
  const { cart } = useContext(ProductContext);
  const { setShowCart } = useContext(CartContext);

  const handleClick = (e) => {
    e.stopPropagation();
    if (cart.length > 0) {
      setShowCart((prev) => !prev);
    }
  };

  return (
    <div className="cart">
      <img
        src={cartIcon}
        alt="cart icon"
        title="Show/Hide"
        onClick={handleClick}
      />
      {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
    </div>
  );
};

export default CartIcon;
