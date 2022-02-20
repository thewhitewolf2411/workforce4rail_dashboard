import React from "react";
import SidebarElement from "../common/SidebarElement";

import SidebarLogo from "../../assets/SidebarLogo.png";

function Sidebar() {

    return (
        <div className="sidebar-main__container">
            <div className="sidebar-logo">
                <img src={SidebarLogo} alt="SidebarLogo" />
            </div>
            <ul className="sidebar-list">
                <SidebarElement location="Dashboard" active={false} link="/dashboard"/>
                <SidebarElement location="Invoices" active={false} link="/invoices"/>
                <SidebarElement location="Products" active={false} link="/products"/>
                <SidebarElement location="Clients" active={false} link="/clients"/>
            </ul>
        </div>
    );
}

export default Sidebar;