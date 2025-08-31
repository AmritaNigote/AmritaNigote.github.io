
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import RegisterPage from "./RegisterPage";
import ContactInfo from "./ContactInfo";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact_info" element={<ContactInfo />} />
  <Route path="/register/:eventId" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}
