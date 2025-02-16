import { React, useContext } from "react";
import ProductContext from "../../context/ProductContext";
import CartContext from "../../context/CartContext";

const EmptyButton = () => {
  const { setCart } = useContext(ProductContext);
  const { setShowCart } = useContext(CartContext);
  
  const handleClick = (e) => {
    e.stopPropagation();

    setCart(() => {
      return [];
    });

     // Alternar el estado de ShowCart correctamente
     setShowCart((prev) => !prev);

  };

  return (
    <button className="emptyButton" onClick={handleClick}>
      Empty Cart
    </button>
  );
};
export default EmptyButton;
