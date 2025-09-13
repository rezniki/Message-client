import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import SendForm from "./pages/SendForm";
import './App.css';
import './index.css';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/send" element={<SendForm />} />
      </Routes>
    </>
  );
}