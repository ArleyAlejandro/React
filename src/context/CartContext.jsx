import { createContext, useState } from "react";

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  
    const [fullCart, setFullCart] = useState(false);

  return (
    <>
      {
        <CartContext.Provider value={{ fullCart, setFullCart }}>
          {children}
        </CartContext.Provider>
      }
    </>
  );
};

export { CartProvider };
export default CartContext;
