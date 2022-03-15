import React, { useContext, useState } from "react";
import { AuthContext } from "../util/AuthContext";

import SidebarLogo from "../../assets/SidebarLogo.png";

import { Link } from "react-router-dom";
import SideDrawer from "../common/SideDrawer";
import NavLinks from "./NavLinks";
import MainHeader from "./MainHeader";

function Navbar() {

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const auth = useContext(AuthContext);

    const openDrawerHandler = () =>  {
        setDrawerIsOpen(true);
    }

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    }

    return (
        <header className={`header ${auth.isLoggedIn ? '' : 'header-full'}`}>
            
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <h1 className="main-navigation__title">
                    <Link to="/">
                    {!auth.isLoggedIn && <img src={SidebarLogo} alt="Logo" />}
                    </Link>
                </h1>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </header>
    );
}

export default Navbar;