import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("rol");

    // Si no está logueado → redirigir al login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Si requiere un rol específico y no lo tiene → redirigir al home
    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return children;
}
