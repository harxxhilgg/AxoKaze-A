import { useEffect } from "react";
import { useAuthStore } from "./stores";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/public/Landing";
import Login from "./pages/public/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/protected/Dashboard";
import ForgotPassword from "./pages/public/ForgotPassword";
import Register from "./pages/public/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { JellyTriangle } from "ldrs/react";
import "ldrs/react/JellyTriangle.css";

function App() {
  const { checkAuth, loading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-zinc-900 dark:text-zinc-100">
        <JellyTriangle size={36} speed={1.5} color="currentColor" />
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          {/* redirect to dashboard if user logged in */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Landing />
              )
            }
          />

          {/* public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* add other public routes here */}

          {/* protected dashboard route */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
