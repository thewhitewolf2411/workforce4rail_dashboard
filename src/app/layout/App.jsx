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
import ClientNew from "../../features/pages/Clients/ClientNew";
import InvoiceNew from "../../features/pages/Invoices/InvoiceNew";
import ProductNew from "../../features/pages/Products/ProductsNew";
import ClientView from "../../features/pages/Clients/ClientView";
import InvoiceView from "../../features/pages/Invoices/InvoiceView";
import ProductView from "../../features/pages/Products/ProductView";
import MainScreen from "../../features/pages/MainScreen/MainScreen";
import Login from "../../features/pages/Login/Login";
import Sidebar from "./Sidebar";
import Container from "./Container";
import { AuthContext } from '../util/AuthContext.js';
import { useAuth } from '../util/CustomHooks.js';

function App() {

  const { token, login, logout, userId } = useAuth();

  let routes;

  if(token){
    routes = (
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/products/new" element={<ProductNew />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/invoice/:id" element={<InvoiceView />} />
        <Route path="/invoices/new" element={<InvoiceNew />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/client/:id" element={<ClientView />} />
        <Route path="/clients/new" element={<ClientNew />} />
      </Routes>
    )
  }
  else{
    routes = (
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout,
    }}>
        <Navbar />
        {token && <Sidebar />}
        <Container>
        {routes}
        </Container>
    </AuthContext.Provider>
  );
}

export default App;