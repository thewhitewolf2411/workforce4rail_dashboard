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
            <div className={props.disabled ? 'btn btn-delete' : 'btn btn-delete btn-delete-active'} onClick={props.disabled ? null : props.action}>
                <p>Delete</p>
            </div>
        );
    }

    if(props.view){
        return(
            <div className={props.disabled ? 'btn btn-view' : 'btn btn-view btn-view-active'} onClick={props.disabled ? null : props.action}>
                <p>View</p>
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