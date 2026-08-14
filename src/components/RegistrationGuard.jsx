import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../lib/AuthContext";

export default function RegistrationGuard({ children, requiredStep }) {
  const { registrationStep } = useContext(AuthContext);
  if (registrationStep < requiredStep) {
    return <Navigate to="/register" replace />;
  }
  return children;
}