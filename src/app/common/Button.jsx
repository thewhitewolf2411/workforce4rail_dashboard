import React from "react";
import { Link, useLocation } from "react-router-dom";

function Button(props) {

    const location = useLocation();

    if(props.new){
        return(
            <Link className='btn btn-new' to={location.pathname + '/new'}>
                <p>New</p>
            </Link>
        );
    }

    if(props.delete){
        return(
            <div className='btn btn-delete' onClick={props.action}>
                <p>Delete</p>
            </div>
        );
    }

  return (
      <div className='btn btn-primary' onClick={props.action}>
          <p>New</p>
      </div>
  );
}

export default Button;