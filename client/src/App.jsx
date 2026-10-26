import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import {AuthProvider, useAuth} from "./context/AuthContext";
import {MovieProvider} from "./context/MovieContext";
import Home from "./pages/Home";
import {SearchResultsList} from "./components/navbar/SearchResultsList";

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
        <MovieProvider>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="/sr" element={<SearchResultsList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
