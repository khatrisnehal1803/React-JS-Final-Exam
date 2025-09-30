import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import { useState } from "react";

const Home = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h1>Products Management App</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add Product"}
      </button>
      {showForm && <ProductForm onClose={() => setShowForm(false)} />}
      <ProductList />
    </div>
  );
};

export default Home;
