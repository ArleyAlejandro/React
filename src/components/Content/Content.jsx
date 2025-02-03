import { useContext, useEffect, useState } from "react";
import Product from "../Product/Product";
import ProductContext from "../../context/ProductContext";

const Content = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {cart, setCart}  = useContext(ProductContext);

  useEffect(() => {
    fetch("../../query-json/cataleg.json")
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
    
  const handleClick = (e) => {
   
    cart
    setCart;

    e.stopPropagation();
    e.target.getAttribute("data-id") ? console.log("Producto añadido:", e.target.getAttribute("data-id")) : "" ;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div onClick={handleClick} className="wrapper">
      {products.map((product) => (
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
        />
      ))}
    </div>
  );
};

export default Content;
