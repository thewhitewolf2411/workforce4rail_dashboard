import React from "react";

function TableElement(props) {

  if(props.headers){
    return(
      <thead>
        <tr>
          {props.headers.map((header, index) => {return <th key={index}>{header}</th>})}
        </tr>
      </thead>
    );
  }

  if(props.type === 'clients'){
    return (
      <tr onClick={() => props.setRowSelected(props.id)} id={props.id} className={props.rowSelected === props.id ? 'selected' : null}>
        <td>{props.name}</td>
        <td>{props.creationDate}</td>
        <td>{props.numberOfInvoices}</td>
      </tr>
    );
  }

  if(props.type === 'products'){
    return (
      <tr onClick={() => props.setRowSelected(props.id)} id={props.id} className={props.rowSelected === props.id ? 'selected' : null}>
        <td>{props.productName}</td>
        <td>{props.productHourlyRate}</td>
        <td>{props.totalNumberofInvoices}</td>
        <td>{props.totalEarnings}</td>
      </tr>
    );
  }

  if(props.type === 'invoices'){
    return (
      <tr onClick={() => props.setRowSelected(props.id)} id={props.id} className={props.rowSelected === props.id ? 'selected' : null}>
        <td>{props.clientName}</td>
        <td>{props.invoiceDate}</td>
        <td>{props.isPaid}</td>
        <td>{props.invoiceTotal}</td>
        <td>{props.invoicedServices}</td>
      </tr>
    );
  }

}

export default TableElement;