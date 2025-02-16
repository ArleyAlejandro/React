import {React,useContext} from "react";
import CartContext from "../../context/CartContext";

const BuyButton = () => {
  const { setShowCart } = useContext(CartContext);

  const handleClick = (e) => {
    e.stopPropagation();

    // Alternar el estado de ShowCart correctamente
    setShowCart((prev) => !prev);
  };

  return (
    <button className="buyButton" onClick={handleClick}>
      Keep Shopping
    </button>
  );
};

export default BuyButton;
