import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../utils/apiRequest";

export default function List() {
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const handleDeleteProduct = async (id) => {
        try {
            const response = await apiRequest("/products/" + id, "DELETE");
            if (response.data.status === 200) {
                setMessage({
                    type: "success",
                    text: "Product successfully deleted!",
                });
                setTimeout(() => navigate("/product-list"), 2000);
            } else {
                setMessage({ type: "error", text: "Error Deleting Product" });
            }
        } catch (error) {
            setMessage({
                type: "error",
                text: "Failed to Delete product. Please try again.",
            });
        }

        setLoading(false);
    };

    useEffect(() => {
        const productList = async () => {
            try {
                setLoading(true);
                setMessage(null);

                const response = await apiRequest("/products", "GET");
                setProducts(response.data.data);
            } catch (error) {
                setMessage(error.message || "Error faching products");
            } finally {
                setLoading(false);
            }
        };
        productList();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="container mx-auto p-4">
                {message && (
                    <div
                        className={`text-center mb-4 ${
                            message.type === "error"
                                ? "text-red-500"
                                : "text-green-500"
                        }`}
                    >
                        {message.text}
                    </div>
                )}
                <Link className="button primary-btn" to="/create-product">
                    Add Product
                </Link>
                <h3 className="text-center w-full">Products List</h3>
                <table className="table-auto border-collapse border border-gray-300 text-center w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Stock Quantity</th>
                            <th className="px-4 py-2">
                                Min Stock Qunatity for Notify
                            </th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="px-4 py-2 text-center"
                                >
                                    No products available
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td className="border px-4 py-2">
                                        {product.id}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {product.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {product.description}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {product.price}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {product.stock_quantity}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {product.min_notification_stock}
                                    </td>
                                    <td>
                                        <Link
                                            className="primary-btn"
                                            to={`/edit-product/${product.id}`}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDeleteProduct(product.id)
                                            }
                                            className="ml-2 danger-btn"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
