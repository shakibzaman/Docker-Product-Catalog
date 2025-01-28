import React from "react";

export default function Home() {
    return (
        <div className="bg-gradient-to-r from-blue-400 to-purple-600 min-h-screen">
            <div className="flex items-center justify-center min-h-screen text-white">
                <div className="text-center space-y-6">
                    <h1 className="text-5xl font-extrabold">Welcome!</h1>
                    <p className="text-xl font-light">This is the Home Page</p>
                    <button className="px-6 py-2 bg-yellow-500 text-black rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300">
                        Explore More
                    </button>
                </div>
            </div>
        </div>
    );
}
