import { useContext, useEffect, useState } from "react";
import Product from "../Product/Product";
import ProductContext from "../../context/ProductContext";
import FilterContext from "../../context/FilterContext";
import CartContext from "../../context/CartContext";
import EmptyButton from "./EmptyButton";
import BuyButton from "./BuyButton";
import { useCallback } from "react";

const Content = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  const { showCart, setShowCart } = useContext(CartContext);
  const { cart, setCart } = useContext(ProductContext);
  const { Filter } = useContext(FilterContext);

  // true or false
  // console.log(showCart);

  // contenido del carrito
  // console.log(cart);

  // 1️⃣ Cargar productos desde la API SOLO UNA VEZ
  useEffect(() => {
    fetch("http://localhost:8000/p3cataleg.php")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  // console.log("Estado de showCart :", showCart);
  // }, [showCart]);

  // 2️⃣ Filtrar productos en tiempo real
  const filteredProducts = products.filter((product) => {
    if (!Filter || Object.keys(Filter).length === 0) return true; // Sin filtros, mostrar todos

    return Object.entries(Filter).every(([key, values]) => {
      if (!values || values.length === 0) return true; // Si no hay valores en la categoría, no filtrar por ella

      const productValue = product[key] ? String(product[key]) : ""; // Convertir a string para evitar errores
      return values.includes(productValue);
    });
  });

  // console.log("Filtros:", Filter);
  // console.log("Productos:", products);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      const productId = e.target.getAttribute("data-id");
      if (!productId) return;

      const selectedProduct = products.find((p) => p.pid === Number(productId));
      if (!selectedProduct) return;

      setCart((prevCart) => {
        if (prevCart.some((item) => item.pid === selectedProduct.pid)) {
          return prevCart;
        }
        return [...prevCart, selectedProduct];
      });
    },
    [products, setCart]
  );

  const handleInputValue = (e, pid, preu) => {
    const newValue = Number(e.target.value);

    setQuantities((prev) => {
      const updatedQuantities = { ...prev };

      if (newValue === 0) {
        // Si la cantidad es 0, eliminamos el producto
        delete updatedQuantities[pid];

        // También lo eliminamos del carrito
        setCart((prevCart) => {
          const newCart = prevCart.filter((item) => item.pid !== pid);

          // Si el carrito está vacío, volvemos a la vista de compra
          if (newCart.length === 0) {
            setShowCart(false);
          }

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Por defecto mostrar la lista de productos para hacer la compra
  if (showCart === false) {
    return (
      <div className="wrapper">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product
              key={product.model}
              pid={product.pid}
              marca={product.marca}
              model={product.model}
              imatge={product.imatge}
              processador={product.processador}
              ram={product.ram}
              emmagatzematge={product.emmagatzematge}
              polzades={product.polzades}
              preu={product.preu}
              handleClick={handleClick}
            />
          ))
        ) : (
          <p className="error">No se encontraron productos</p>
        )}
      </div>
    );
  }
  // Mostrar la lista de productos dentro del carrito
  else {
    return (
      <div className="wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Ref.</th>
              <th>Imatge</th>
              <th>Descripció</th>
              <th>Quantitat</th>
              <th>Preu</th>
              <th>Import</th>
            </tr>
          </thead>
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
          <EmptyButton></EmptyButton>
          <BuyButton></BuyButton>
        </div>
        <p className="importe">Total: {getTotal()} €</p>
      </div>
    );
  }
};

export default Content;
