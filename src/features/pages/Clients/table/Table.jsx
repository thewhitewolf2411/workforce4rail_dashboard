import React from "react";
import TableElement from "./TableElement";

function Table(props) {

  return (
    <div className='clients-table__container'>
      <table>
        <TableElement headers={props.headers} />
        <tbody>
          {props.data.map((row, index) => {
            return(
              <TableElement key={row.id} id={row.id} name={row.name} creationDate={row.creationDate} numberOfInvoices={row.numberOfInvoices} setRowSelected={props.setRowSelected} rowSelected={props.rowSelected}/>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;