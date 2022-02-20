import React from "react";
import Navbar from "./Navbar";
import {
  Routes,
  Route
} from "react-router-dom";
import Dashboard from "../../features/pages/Dashboard/Dashboard";
import Products from "../../features/pages/Products/Products";
import Invoices from "../../features/pages/Invoices/Invoices";
import Clients from "../../features/pages/Clients/Clients";
import Sidebar from "./Sidebar";
import Container from "./Container";

function App() {

  return (
    <>
        <Navbar />
        <Sidebar />
        <Container>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/clients" element={<Clients />} />
          </Routes>
        </Container>
    </>
  );
}

export default App;