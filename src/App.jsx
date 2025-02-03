import Content from "./components/Content/Content";
import { ProductProvider } from "./context/ProductContext";
import Header from "./components/Header/Header"

function App() {
  return (
    <ProductProvider>
      <Header/>
      <Content/>
    </ProductProvider>
  );
}

export default App;
