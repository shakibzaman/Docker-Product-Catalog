import { useEffect, useState } from "react";
import apiRequest from "./../utils/apiRequest";

export default function List() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const userList = async () => {
            setLoading(true);
            setMessage(null);

            try {
                const response = await apiRequest("/users", "GET");
                console.log("User response is", response.data.users);
                if (response.success) {
                    setUsers(response.data.users); // Set users in state
                } else {
                    setMessage(response.message); // Handle error message
                }
            } catch (error) {
                setMessage(error.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        userList();
    }, []); // Empty dependency array, so this runs only once when the component mounts

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="container mx-auto p-4">
                {message && (
                    <div className="text-red-500 text-center mb-4">
                        {message}
                    </div>
                )}
                <h3 className="text-center w-full">User List</h3>
                <table className="table-auto border-collapse border border-gray-300 text-center w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Join Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2">{user.id}</td>
                                <td className="border px-4 py-2">
                                    {user.name}
                                </td>
                                <td className="border px-4 py-2">
                                    {user.email}
                                </td>
                                <td className="border px-4 py-2">
                                    {user.created_at}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
