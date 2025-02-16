import Header from "./components/Header/Header";
import MainMenu from "./components/MainMenu/MainMenu";
import Aside from "./components/Aside/Aside";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";

import { ProductProvider } from "./context/ProductContext";
import { FilterProvider } from "./context/FilterContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <ProductProvider>
      <FilterProvider>
        <Header />
        <CartProvider>
          <MainMenu />
          <div className="flex-div">
            <Aside />
            <Content />
          </div>
        </CartProvider>
        <Footer />
      </FilterProvider>
    </ProductProvider>
  );
}

export default App;
