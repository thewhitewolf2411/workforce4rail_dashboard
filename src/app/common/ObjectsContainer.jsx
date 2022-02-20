import React from "react";
import { Link } from "react-router-dom";
import ListElement from "./ListElement";

function ObjectsContainer(props) {

    return (
        <div className="object__container">
            {props.data.map((element, index) => {
                return(
                    <ListElement />
                );
            })}
        </div>
    );
}

export default ObjectsContainer;