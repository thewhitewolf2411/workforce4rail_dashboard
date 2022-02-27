import React from "react";
import SidebarElement from "../common/SidebarElement";

import SidebarLogo from "../../assets/SidebarLogo.png";
import dashboardImageInctive from "../../assets/dashboard_inactive.png";
import invoicesImageInctive from "../../assets/invoices_inactive.png";
import productsImageInctive from "../../assets/products_inactive.png";
import clientsImageInctive from "../../assets/clients_inactive.png";
import dashboardImageActive from "../../assets/dashboard_active.png";
import invoicesImageActive from "../../assets/invoices_active.png";
import productsImageActive from "../../assets/products_active.png";
import clientsImageActive from "../../assets/clients_active.png";
import { useLocation } from "react-router";

function Sidebar() {

    const location = useLocation();

    return (
        <div className="sidebar-main__container">
            <div className="sidebar-logo">
                <img src={SidebarLogo} alt="SidebarLogo" />
            </div>
            <ul className="sidebar-list">
                <SidebarElement location="Dashboard" imageInactive={dashboardImageInctive} imageActive={dashboardImageActive} active={location.pathname.indexOf('/dashboard') > -1} link="/dashboard"/>
                <SidebarElement location="Invoices" imageInactive={invoicesImageInctive} imageActive={invoicesImageActive} active={location.pathname.indexOf('/invoices') > -1 || location.pathname.indexOf('/invoice') > -1} link="/invoices"/>
                <SidebarElement location="Products" imageInactive={productsImageInctive} imageActive={productsImageActive} active={location.pathname.indexOf('/products') > -1 || location.pathname.indexOf('/product') > -1} link="/products"/>
                <SidebarElement location="Clients" imageInactive={clientsImageInctive} imageActive={clientsImageActive} active={location.pathname.indexOf('/clients') > -1 || location.pathname.indexOf('/client') > -1} link="/clients"/>
            </ul>
        </div>
    );
}

export default Sidebar;