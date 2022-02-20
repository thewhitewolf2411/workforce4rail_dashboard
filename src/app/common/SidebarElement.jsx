import React from "react";
import { Link, useLocation } from "react-router-dom";

function SidebarElement(props) {

    const location = useLocation();

    return (
        <li className={props.link === location.pathname ? "sidebar-element sidebar-element__active" : "sidebar-element"}>
            <Link to={props.link}>
                <div className="sidebar-element__image">
                    <img src={props.image} alt={props.image} />
                </div>
                <div className="sidebar-element__content">
                    <p>{props.location}</p>
                </div>
            </Link>
        </li>
    );
}

export default SidebarElement;