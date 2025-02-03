import Content from "./components/Content/Content";
import { ProductProvider } from "./context/ProductContext";
import Header from "./components/Header/Header"
import MainMenu from "./components/MainMenu/MainMenu";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <ProductProvider>
      <Header/>
      <MainMenu/>
      <Content/>
      <Footer/>
    </ProductProvider>
  );
}

export default App;
