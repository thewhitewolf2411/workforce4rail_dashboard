import React from "react";
import TableElement from "./TableElement";

function Table(props) {

  console.log(props.clients);

  return (
    <div className='table__container'>
      <table>
        <TableElement headers={props.headers} />
        <tbody>
          {props.clients && props.clients.map((row, index) => {
            return(
              <TableElement 
                key={row.id} 
                id={row.id} 
                type={'clients'} 
                name={row.name} 
                creationDate={row.creationDate} 
                numberOfInvoices={row.numberOfInvoices} 
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
                totalNumberofInvoices={row.totalNumberofInvoices} 
                totalEarnings={row.totalEarnings} 
                setRowSelected={props.setRowSelected} 
                rowSelected={props.rowSelected}/>
            );
          })}
          {props.invoices && props.invoices.map((row, index) => {
            return(
              <TableElement
                key={row.id}
                id={row.id}
                type={'invoices'}
                clientName={row.clientName}
                invoiceDate={row.invoiceDate}
                paymentDeadline={row.paymentDeadline}
                isPaid={row.isPaid}
                invoiceTotal={row.invoiceTotal}
                invoicedServices={row.invoicedServices}
                />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;