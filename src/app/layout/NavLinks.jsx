import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';

import { AuthContext } from "../util/AuthContext";

const NavLinks = props => {

    const auth = useContext(AuthContext);

    return(
        <ul className="nav-links">
            {auth.isLoggedIn && <li><button className="btn btn-new" onClick={auth.logout}>LOGOUT</button></li>}
            {!auth.isLoggedIn &&<li><NavLink className="btn btn-new" to="/login">LOGIN</NavLink></li>}
        </ul>
    );
}

export default NavLinks;