import { useContext, useEffect, useState } from "react";
import Product from "../Product/Product";
import ProductContext from "../../context/ProductContext";

const Content = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, setCart } = useContext(ProductContext);

  // Este hook permite ejecutar efectos secundarios en los componentes de React. El código dentro de useEffect se ejecuta cuando el componente se monta (es decir, cuando se renderiza por primera vez).
  // El segundo parámetro [] asegura que el efecto se ejecute solo una vez
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
    e.stopPropagation();

    // Obtener el ID del producto
    const productId = e.target.getAttribute("data-id");
    if (!productId) return;

    // Buscar el producto en la lista de productos cargados
    const selectedProduct = products.find(
      (product) => product.pid === productId
    );
    if (!selectedProduct) return;

    // Verificar si ya está en el carrito
    setCart((prevCart) => {
      if (prevCart.some((item) => item.pid === productId)) {
        return prevCart;
      }
      return [...prevCart, selectedProduct]; 
    });
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
