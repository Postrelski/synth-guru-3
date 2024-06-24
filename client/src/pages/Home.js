import Navbar from "../components/Navbar";
import Product from "../components/Product";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import data from "../data.json";
import "./styles/Home.css";

function Home() {
  return (
    <>
      <Navbar />
      <p className="home_title">SERUM</p>
      <div className="serumContainer">
        {data.map((item) => (
          <Product
            className="product"
            title={item.title}
            key={item.key}
            price={item.price}
            href={item.href}
            pic={item.pic}
          />
        ))}
      </div>
      <ProductList />
      <Footer />
    </>
  );
}

export default Home;
