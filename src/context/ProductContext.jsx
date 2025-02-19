import { createContext, useState, useEffect } from "react";

const ProductContext = createContext(null);

const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Cargar carrito desde localStorage solo una vez al iniciar
    const savedCart = localStorage.getItem("Carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("Carrito", JSON.stringify(cart));
    
  }, [cart]);

  return (
    <ProductContext.Provider value={{ cart, setCart }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider };
export default ProductContext;
