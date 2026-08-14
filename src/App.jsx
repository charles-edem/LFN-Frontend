import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import OtpVerificationPage from "./pages/OtpVerificationPage";
import SuccessPage from "./pages/SuccessPage";
import MemberHomePage from "./pages/MemberHome";
import AdminDashboardPage from "./pages/AdminDashboard";
import ErrorPage from "./pages/ErrorPage";
import RegistrationGuard from "./components/RegistrationGuard";
import AdminLogin from "./pages/AdminDashboardLogin";
import "./App.css"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route
          path="/verify"
          element={
            <RegistrationGuard requiredStep={1}>
              <OtpVerificationPage />
            </RegistrationGuard>
          }
        />
        <Route
          path="/success"
          element={
            <RegistrationGuard requiredStep={2}>
              <SuccessPage />
            </RegistrationGuard>
          }
        />
        <Route path="/home" element={<MemberHomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
              <AdminDashboardPage />
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;