import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../redux/productSlice";

const ProductForm = ({ productToEdit }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // Populate form if editing
  useEffect(() => {
    if (productToEdit && typeof productToEdit === "object") {
      setTitle(productToEdit.title );
      setCategory(productToEdit.category);
      setPrice(productToEdit.price );
      setImages(productToEdit.setImages );
    } else {
      setTitle("");
      setCategory("");
      setPrice("");
      setImage("");
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      title,
      category,
      price: Number(price),
      image,
    };

    if (productToEdit?.id) {
      dispatch(updateProduct({ id: productToEdit.id, product }));
    } else {
      dispatch(addProduct(product));
    }

    // Reset form
    setTitle("");
    setCategory("");
    setPrice("");
    setImage("");

   
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        placeholder="Images URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <div style={{ marginTop: "10px" }}>
        <button type="submit">{productToEdit ? "Update" : "Add"} Product</button>
        <button type="button" onClick={ ""} style={{ marginLeft: "5px" }}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
