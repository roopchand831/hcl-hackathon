import "./Layout.css";
import { BrowserRouter, Route, NavLink, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "../../utils/ProtectedRoute";

// Lazy-loaded components
const Signup = lazy(() => import("../Signup/Signup"));
const Login = lazy(() => import("../Login/Login"));
const Patient = lazy(() => import("../Dashboard/Patient"));
const HealthCareProvider = lazy(() => import("../Dashboard/HealthCareProvider"));
const ForbiddenPage = lazy(() => import("../../UI/Forbidden"));

function Layout() {
  const isAuthenticated = localStorage.getItem('AceessTokenData');

  return (
    <BrowserRouter>
      <div className="Layout">
        <br />
        {!isAuthenticated && (
          <nav className="navbar">
            <NavLink to="/register">Signup</NavLink>
            <NavLink to="/">Login</NavLink>
          </nav>
        )}

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/register" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            
            <Route
              path="/patient"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <Patient patient={{ name: "Patient name" }} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/healthcareprovider"
              element={
                <ProtectedRoute allowedRoles={["healthCareProvider"]}>
                  <HealthCareProvider provider={{ name: "Health care provider name" }} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default Layout;
