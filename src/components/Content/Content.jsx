import { useContext, useEffect, useState } from "react";
import Product from "../Product/Product";
import ProductContext from "../../context/ProductContext";
import FilterContext from "../../context/FilterContext";

const Content = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setCart } = useContext(ProductContext);
  const { Filter } = useContext(FilterContext);

  // Este hook permite ejecutar efectos secundarios en los componentes de React. El código dentro de useEffect se ejecuta cuando el componente se monta (es decir, cuando se renderiza por primera vez).
  // El segundo parámetro [] asegura que el efecto se ejecute solo una vez
  // 1. Cargar productos SOLO UNA VEZ al inicio
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
  }, [Filter]);

  // console.log("Filtros:", Filter);
  // console.log("Productos:", products);

  const handleClick = (e) => {
    // console.log("handleClick ejecutado");
    e.stopPropagation();

    // Obtener el ID del producto
    const productId = e.target.getAttribute("data-id"); //Se obtiene el pid del producto desde el atributo data-id del HTML.

    if (!productId) {
      // console.log("No llega un id");
      return;
    } else {
      // console.log("Llega el id: ", productId);
    }

    // console.log({ "Productos Clickado: ": products[productId - 1] });
    var selectedProduct = products[productId - 1];
    console.log(selectedProduct);

    // console.log(products.find((producto) => producto.pid === productId));

    if (!selectedProduct) {
      // console.log("no llega un producto");
      return;
    } else {
      // console.log("Producto encontrado:", selectedProduct);
    }

    // Verificar si ya está en el carrito
    setCart((prevCart) => {
      // Si ya está en el carrito, no lo añade de nuevo.
      if (prevCart.some((item) => item.pid === productId)) {
        return prevCart;
      }

      // console.log({"Carrito antes de agregar productos: ":prevCart});

      return [...prevCart, selectedProduct];
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filtrar productos según los filtros seleccionados

  // Renderizar los Productos
  return (
    <div className="wrapper">
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
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Content;
