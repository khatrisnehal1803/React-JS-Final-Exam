import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../redux/productSlice";
import ProductForm from "./ProductForm";

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items || []);

    const [showForm, setShowForm] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleEdit = (product) => {
        setProductToEdit(product); // pass the full product object
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) dispatch(deleteProduct(id));
    };

    return (
        <div>
            <button onClick={() => { setProductToEdit(null); setShowForm(true); }}>
                Add Product
            </button>

            {showForm && (
                <ProductForm
                    productToEdit={productToEdit}
                    onClose={() => setShowForm(false)}
                />
            )}

            <table>
                <thead>
                    <tr>
                        <th>Images</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
  {products.map((p) => (
    <tr key={p.id}>
      <td>
        <img
          src={p.image}
          alt={p.title}
          width="50"
          height="50"
          style={{ objectFit: "cover", borderRadius: "5px" }}
        />
      </td>
      <td>{p.title}</td>
      <td>{p.category}</td>
      <td>{p.price}</td>
      <td>
        <button onClick={() => handleEdit(p)}>Edit</button>
        <button onClick={() => handleDelete(p.id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>


            </table>
        </div>
    );
};

export default ProductList;
