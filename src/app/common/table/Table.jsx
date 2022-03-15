import React from "react";
import TableElement from "./TableElement";

function Table(props) {
  return (
    <div className='table__container'>
      <table>
        <TableElement headers={props.headers} />
        <tbody>
          {props.clients && props.clients.map((row, index) => {
            const date = new Date(row.created_at);

            return(
              <TableElement 
                key={row.id} 
                id={row.id} 
                type={'clients'} 
                name={row.name} 
                creationDate={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`} 
                numberOfInvoices={row.invoices.length} 
                setRowSelected={props.setRowSelected} 
                rowSelected={props.rowSelected}/>
            );
          })}
          {props.products && props.products.map((row, index) => { 
            return(
              <TableElement 
                key={row.id} 
                id={row.id} 
                type={'products'} 
                productName={row.productName} 
                productHourlyRate={row.productHourlyRate} 
                totalNumberofInvoices={row.invoices.length} 
                totalEarnings={row.totalEarnings} 
                setRowSelected={props.setRowSelected} 
                rowSelected={props.rowSelected}/>
            );
          })}
          {props.invoices && props.invoices.map((row, index) => {
            const date = new Date(row.createdAt);
            
            return(
              <TableElement
                key={row.id}
                id={row.id}
                type={'invoices'}
                clientName={row.customer.name}
                invoiceDate={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                isPaid={row.paid ? `Yes` : `No`}
                invoiceTotal={row.invoiceTotal}
                invoicedServices={row.products.length}
                setRowSelected={props.setRowSelected} 
                rowSelected={props.rowSelected}
                />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;