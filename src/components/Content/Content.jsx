import { useContext, useEffect, useState } from "react";
import Product from "../Product/Product";
import ProductContext from "../../context/ProductContext";
import FilterContext from "../../context/FilterContext";
import CartContext from "../../context/CartContext";
import { useCallback } from "react";
import FullCart from "./FullCart/FullCart";

const Content = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  const { showCart, setShowCart } = useContext(CartContext);
  const { cart, setCart } = useContext(ProductContext);
  const { Filter } = useContext(FilterContext);

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


  const filteredProducts = products.filter((product) => {
    if (!Filter || Object.keys(Filter).length === 0) return true;

    return Object.entries(Filter).every(([key, values]) => {
      if (!values || values.length === 0) return true; 

      const productValue = product[key] ? String(product[key]) : ""; 
      return values.includes(productValue);
    });
  });


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
      <FullCart></FullCart>
    );
  }
};

export default Content;
