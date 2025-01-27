import React from "react";

export default function CreateProduct() {
    return (
        <div>
            <h4>Create Product</h4>
            <form action="">
                <div>
                    <label className="block text-gray-700 font-semibold">
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">
                        Description:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
            </form>
        </div>
    );
}
