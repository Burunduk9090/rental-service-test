import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApartmentListPage from "./pages/apartments/ApartmentListPage.jsx";
import ApartmentDetailPage from "./pages/apartments/ApartmentDetailPage.jsx";
import "./styles/index.css";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ApartmentListPage />} />
        <Route path="/apartments/:slug/" element={<ApartmentDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;