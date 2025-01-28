import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiRequest from "../utils/apiRequest";

export default function EditProduct() {
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const id = useParams().id;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        min_notification_stock: "",
    });
    console.log("Is", id);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const productList = async () => {
            try {
                setLoading(true);
                setMessage(null);

                const response = await apiRequest("/products/" + id, "GET");
                console.log("Product Response", response.data.data);
                setFormData(response.data.data);
            } catch (error) {
                setMessage(error.message || "Error faching products");
            } finally {
                setLoading(false);
            }
        };
        productList();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await apiRequest(
                "/products/" + id,
                "PUT",
                formData
            );
            console.log("Update response", response);
            if (response.data.status === 200) {
                setMessage({
                    type: "success",
                    text: "Product successfully Updated!",
                });
                setTimeout(() => navigate("/product-list"), 3000);
            } else {
                setMessage({ type: "error", text: response.data.message });
            }
        } catch (error) {
            setMessage({
                type: "error",
                text: "Failed to Update product. Please try again.",
            });
        }

        setLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto p-4 mt-8">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Create New Product
                </h2>

                {/* Display Message */}
                {message && (
                    <div
                        className={`mb-4 p-2 text-sm rounded ${
                            message.type === "success"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Stock Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            name="stock_quantity"
                            value={formData.stock_quantity}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Minimum Notification Stock */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Minimum Notification Stock
                        </label>
                        <input
                            type="number"
                            name="min_notification_stock"
                            value={formData.min_notification_stock}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="primary-btn mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        {loading ? "Updating... Success" : "Update Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}
