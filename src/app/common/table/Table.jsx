import React from "react";

function Table(props) {

  return (
    <div className='table__container'>
      <table>
        <thead>
          {props.map((head, index) => {
            
          })} 
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default Table;