import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../utils/apiRequest";

export default function List() {
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productList = async () => {
            try {
                setLoading(true);
                setMessage(null);

                const response = await apiRequest("/products", "GET");
                console.log("Product Response", response.data.data);
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
                    <div className="text-red-500 text-center mb-4">
                        {message}
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
                        {products.map((product) => (
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
