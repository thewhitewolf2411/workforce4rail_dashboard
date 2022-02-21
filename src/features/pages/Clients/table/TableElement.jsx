import React from "react";

function TableElement(props) {

  if(props.headers){
    return(
      <thead>
        <tr>
          <th>{props.headers[0]}</th>
          <th>{props.headers[1]}</th>
          <th>{props.headers[2]}</th>
        </tr>
      </thead>
    );
  }

  return (
    <tr onClick={() => props.setRowSelected(props.id)} id={props.id} className={props.rowSelected === props.id ? 'selected' : null}>
      <td>{props.name}</td>
      <td>{props.creationDate}</td>
      <td>{props.numberOfInvoices}</td>
    </tr>
  );
}

export default TableElement;