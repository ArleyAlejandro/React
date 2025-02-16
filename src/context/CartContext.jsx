import { createContext, useState } from "react";

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  
    const [showCart, setShowCart] = useState(false);

  return (
    <>
      {
        <CartContext.Provider value={{ showCart, setShowCart }}>
          {children}
        </CartContext.Provider>
      }
    </>
  );
};

export { CartProvider };
export default CartContext;
