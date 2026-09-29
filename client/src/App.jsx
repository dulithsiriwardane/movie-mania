import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {AuthProvider, useAuth} from "./context/AuthContext";

function ProtectedRoute({children}) {
  const {isAuthenticated, loading} = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Dashboard (replace with your component)</div>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
