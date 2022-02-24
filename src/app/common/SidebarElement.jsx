import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function SidebarElement(props) {

    const location = useLocation();

    return (
        <li className={props.active ? "sidebar-element sidebar-element__active" : "sidebar-element"}>
            <Link to={props.link}>
                <div className="sidebar-element__image">
                    {props.active ? <img src={props.imageActive} alt={props.link} /> : <img src={props.imageInactive} alt={props.link} />}
                </div>
                <div className="sidebar-element__content">
                    <p>{props.location}</p>
                </div>
            </Link>
        </li>
    );
}

export default SidebarElement;