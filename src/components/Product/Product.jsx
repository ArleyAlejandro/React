import CartContext from "../../context/CartContext";
import React, { memo, useContext } from "react";

const Product = ({
  pid,
  marca,
  model,
  imatge,
  processador,
  ram,
  emmagatzematge,
  polzades,
  preu,
  handleClick,
}) => {
  const { showCart } = useContext(CartContext);

  if (!showCart) {
    return (
      <div className="product-wrapper">
        <div className="prod-title">
          <h2>{marca}</h2>
          <h3>{model}</h3>
        </div>
        <img src={`../../src/pccomp/${imatge}`} alt={model} />
        <p>
          {processador}/{ram}/{emmagatzematge}/{polzades}
        </p>
        <a href="#">See Details</a>
        <p>Price: {preu} €</p>
        <button
          data-id={pid}
          className="buy-button"
          title="Buy this product"
          onClick={handleClick}
        >
          Buy
        </button>
      </div>
    );
  } else {
    return (
      <div className="product-wrapper">
        <div className="prod-title">
          <span>{pid}</span>
        </div>
        <img src={`../../src/pccomp/${imatge}`} alt={model} />
        <p>
          {processador}/{ram}/{emmagatzematge}/{polzades}
        </p>
        <a href="#">See Details</a>
        <p>Price: {preu} €</p>
        <button data-id={pid} className="buy-button" onClick={handleClick}>
          Buy
        </button>
      </div>
    );
  }
};

export default memo(Product);
