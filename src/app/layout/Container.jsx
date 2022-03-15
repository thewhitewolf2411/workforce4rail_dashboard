import React, { useContext } from "react";
import { AuthContext } from "../util/AuthContext";

function Container(props) {

    const auth = useContext(AuthContext);

    return (
        <div className={`container ${auth.isLoggedIn ? '' : 'container-full'}`}>
            {props.children}
        </div>
    );
}

export default Container;