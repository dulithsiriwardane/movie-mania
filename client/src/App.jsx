import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
