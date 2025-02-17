import React, { useContext, useState, useEffect } from "react";
import EmptyButton from "../EmptyButton";
import BuyButton from "../BuyButton";
import ProductContext from "../../../context/ProductContext";
import CartContext from "../../../context/CartContext";
import THead from "./THead";

const FullCart = () => {
  const [quantities, setQuantities] = useState({});
  const { cart, setCart } = useContext(ProductContext);
  const { setShowCart } = useContext(CartContext);

  //  Manejar el cierre del carrito en useEffect
  useEffect(() => {
    if (cart.length === 0) {
      setShowCart(false);
    }
  }, [cart, setShowCart]);

  const getTotal = () => {
    return cart
      .reduce((total, product) => {
        const importe = Number(
          quantities[product.pid]?.importe ?? product.preu
        );
        return total + importe;
      }, 0)
      .toFixed(2);
  };

  const handleInputValue = (e, pid, preu) => {
    const newValue = Number(e.target.value);

    setQuantities((prev) => {
      const updatedQuantities = { ...prev };

      if (newValue === 0) {
        // Si la cantidad es 0, eliminamos el producto
        delete updatedQuantities[pid];

          // También lo eliminamos del carrito
          setCart((prevCart) => {
            console.log(prevCart);
            const newCart = prevCart.filter((item) => item.pid !== pid);
            return newCart;
          });

      } else {
        // Si no es 0, simplemente actualizamos la cantidad
        updatedQuantities[pid] = {
          cantidad: newValue,
          importe: newValue * preu,
        };
      }

      return updatedQuantities;
    });
  };

  return (
    <div className="fullCartWrapper">
      <div className="wrapper">
        <table className="product-table">
          <THead></THead>
          <tbody>
            {cart.map((product) => (
              <tr key={product.pid}>
                <td>{product.pid}</td>
                <td>
                  <img
                    src={`../../src/pccomp/${product.imatge}`}
                    alt={product.model}
                    className="product-image"
                  />
                </td>
                <td>
                  {product.marca} {product.model} <br />
                  {product.processador} / {product.ram} /{" "}
                  {product.emmagatzematge} / {product.polzades}"
                </td>
                <td>
                  <input
                    type="number"
                    max="10"
                    defaultValue="1"
                    className="quantity-input"
                    onChange={(e) =>
                      handleInputValue(e, product.pid, product.preu)
                    }
                  />
                </td>
                <td>{product.preu} €</td>
                {/* Busca la cantidad del producto a partir del pid, además si no a aumentado, pone el precio x defecto */}
                <td>
                  {Number(
                    quantities[product.pid]?.importe ?? product.preu
                  ).toFixed(2)}{" "}
                  €
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cartButtons">
          <BuyButton></BuyButton>
          <EmptyButton></EmptyButton>
        </div>
        <p className="importe">Total: {getTotal()} €</p>
      </div>
    </div>
  );
};

export default FullCart;
