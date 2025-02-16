import React, { useContext, memo } from "react";
import CartContext from "../../context/CartContext";

const BuyButton = () => {
  const { setShowCart } = useContext(CartContext);

  const handleClick = (e) => {
    e.stopPropagation();

    setShowCart((prev) => !prev);
  };

  return (
    <button className="buyButton" onClick={handleClick}>
      Keep Shopping
    </button>
  );
};

export default memo(BuyButton);
