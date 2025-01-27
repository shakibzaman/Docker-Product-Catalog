import {
    Route,
    BrowserRouter as Router,
    Routes,
    useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import { AuthProvider } from "./components/auth/AuthContext";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RedirectIfAuthenticated from "./components/auth/RedirectIfAuthenticated"; // Import the wrapper
import Navbar from "./components/partials/Navbar";
import CreateProduct from "./components/products/CreateProduct";
import EditProduct from "./components/products/EditProduct";
import ProductList from "./components/products/List";
import List from "./components/users/List";
import Register from "./components/users/Register";

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <Layout />
            </AuthProvider>
        </Router>
    );
}

// Layout component to control Navbar visibility
function Layout() {
    const location = useLocation();

    // Hide Navbar on login ("/") and register ("/register") pages
    const hideNavbar = location.pathname === "/";

    return (
        <>
            {!hideNavbar && <Navbar />}
            <Routes>
                <Route
                    path="/"
                    element={
                        <RedirectIfAuthenticated>
                            <Login />
                        </RedirectIfAuthenticated>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <RedirectIfAuthenticated>
                            <Register />
                        </RedirectIfAuthenticated>
                    }
                />
                <Route
                    path="/user-list"
                    element={
                        <RedirectIfAuthenticated>
                            <List />
                        </RedirectIfAuthenticated>
                    }
                />
                <Route
                    path="/product-list"
                    element={
                        <RedirectIfAuthenticated>
                            <ProductList />
                        </RedirectIfAuthenticated>
                    }
                />
                <Route
                    path="/create-product"
                    element={
                        <RedirectIfAuthenticated>
                            <CreateProduct />
                        </RedirectIfAuthenticated>
                    }
                />

                <Route
                    path="/edit-product/:id"
                    element={
                        <RedirectIfAuthenticated>
                            <EditProduct />
                        </RedirectIfAuthenticated>
                    }
                />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}
