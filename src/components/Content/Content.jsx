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
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  const { showCart } = useContext(CartContext);
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

        const newCart = [...prevCart, selectedProduct];
        localStorage.setItem("Carrito", JSON.stringify(newCart));

        return [...prevCart, selectedProduct];
      });
    },
    [products, setCart]
  );

  // guardar en localStorage el contenido del carro
  useEffect(() => {
    localStorage.setItem("Carrito", JSON.stringify(cart));
  }, [cart]);

  const totalPaginas = Math.ceil(filteredProducts.length / productosPorPagina);
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const productosVisibles = filteredProducts.slice(
    indiceInicio,
    indiceInicio + productosPorPagina
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Por defecto mostrar la lista de productos para hacer la compra
  if (showCart === false) {
    return (
      <div className="wrapper">
        {filteredProducts.length > 0 ? (
          <>
            {productosVisibles.map((product) => (
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

            <button
              className="back-button"
              onClick={() => {
                setPaginaActual(paginaActual - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={paginaActual === 1}
            >
              Anterior
            </button>
            <span className="page-number">
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              className="next-button"
              onClick={() => {
                setPaginaActual(paginaActual + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={paginaActual === totalPaginas}
            >
              Siguiente
            </button>
          </>
        ) : (
          <p className="error">No se encontraron productos</p>
        )}
      </div>
    );
  }
  else {
    return <FullCart></FullCart>;
  }
};

export default Content;
