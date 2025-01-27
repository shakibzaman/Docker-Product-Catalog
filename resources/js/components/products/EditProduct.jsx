import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiRequest from "../utils/apiRequest";

export default function EditProduct() {
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const id = useParams().id;
    console.log("Is", id);

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const productList = async () => {
            try {
                setLoading(true);
                setMessage(null);

                const response = await apiRequest("/products/" + id, "GET");
                console.log("Product Response", response.data.data);
                setProduct(response.data.data);
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
                <h3 className="text-center w-full">Products List</h3>
                <table className="table-auto border-collapse border border-gray-300 text-center w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {products.map((product) => (
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
                                <td></td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
