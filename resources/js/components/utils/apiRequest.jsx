export default async function apiRequest(
    endpoint,
    method = "GET",
    body = null,
    headers = {}
) {
    const API_BASE_URL = "http://localhost:8283/api"; // API Base URL

    const token = localStorage.getItem("token");

    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "", // Add the Bearer token if it exists
            ...headers,
        },
    };
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("config", config);
    // Only add body for POST/PUT methods
    if (body && (method === "POST" || method === "PUT")) {
        config.body = JSON.stringify(body);
        console.log("is it here?");
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        console.log("Response for API Logout", response);

        // Check if response is ok (status code 200-299)
        if (!response.ok) {
            const errorText = await response.text(); // Get raw response
            console.error("Server Error Response:", errorText);
            throw new Error(errorText || "Something went wrong");
        }

        const data = await response.json();
        console.log("After response data is", data);
        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
}

// try {
//     const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
//     const data = await response.json();

//     if (!response.ok) {
//         throw data; // Throw error response
//     }

//     return { success: true, data };
// } catch (error) {
//     return {
//         success: false,
//         message: error.message || "Something went wrong",
//     };
// }
// }
