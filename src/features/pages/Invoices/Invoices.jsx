import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ActivityIndicator from "../../../app/common/ActivityIndicator";
import ErrorModal from "../../../app/common/ErrorModal";
import PageHeader from "../../../app/common/PageHeader";
import Table from "../../../app/common/table/Table";
import TableController from "../../../app/common/table/TableController";
import { useHttpClient } from "../../../app/util/CustomHooks";

function Invoices() {

  const [numberOfResults, setNumberOfResults] = useState(10);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [rowSelected, setRowSelected] = useState(0);
  const [invoices, setInvoices] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate('/invoice/' + rowSelected);
  }

  const handleSelect = (id) => {
    if(rowSelected === id){
      setRowSelected(0);
    }
    else{
      setRowSelected(id);
    }
  }

  const handleDeleteClick = () => {
  }

  useEffect(() => {
    const fetchClients = async () => {
      try{
        const responseData = await sendRequest(`/api/invoices/all?numberofresults=${numberOfResults}&page=${page}`);

        setInvoices(responseData.invoices);
        setNumberOfPages(responseData.numberOfPages);
        
      } catch(err){}
    }

    fetchClients();
  }, [sendRequest, numberOfResults, page]);

  const TABLE_HEADERS = [
    'Client Name',
    'Invoice Date',
    'Is paid',
    'Invoice total',
    'Number of services'
  ]

  return (
    <div className='invoices__list'>
      <ErrorModal error={error} onClear={clearError} />
      <PageHeader viewClient={handleViewClick} deleteClient={handleDeleteClick} buttonsDisabled={rowSelected === 0 ? true : false}/>
      {isLoading && <ActivityIndicator asOverlay />}
      {invoices.length !== 0 && <Table headers={TABLE_HEADERS} invoices={invoices} setRowSelected={handleSelect} rowSelected={rowSelected}/>}
      
      <TableController numberOfResults={numberOfResults} page={page} setNumberOfResults={setNumberOfResults} setPage={setPage} numberOfPages={numberOfPages}/>
    </div>
  );
}

export default Invoices;