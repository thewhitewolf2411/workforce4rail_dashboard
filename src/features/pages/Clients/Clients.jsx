import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'

import ActivityIndicator from "../../../app/common/ActivityIndicator";
import ErrorModal from "../../../app/common/ErrorModal";
import PageHeader from "../../../app/common/PageHeader";
import Table from "../../../app/common/table/Table";
import TableController from "../../../app/common/table/TableController";
import { useHttpClient } from "../../../app/util/CustomHooks";

const Clients = () => {

  const [numberOfResults, setNumberOfResults] = useState(10);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [rowSelected, setRowSelected] = useState(0);
  const [clients, setClients] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate('/client/' + rowSelected);
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
    Swal.fire({
      title: 'Warning!',
      text: 'This action will delete all invoices for this client?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Discard',
    }).then((result) => {
      if(result.isConfirmed){
        deleteClient();
      }
      else if(result.isDenied){
        Swal.fire('Client not deleted.', '', 'info')
      }
    })
  }

  const deleteClient = async () => {
    try{
      const deleteResponseData = await sendRequest(`/api/clients/${rowSelected}`, 'DELETE', null, { "Content-Type": "application/json"});
      if(deleteResponseData.status === 200){
        Swal.fire('Client deleted succesfully.', '', 'success');
        const responseData = await sendRequest(`/api/clients/all?numberofresults=${numberOfResults}&page=${page}`);

        setClients(responseData.clients);
        setNumberOfPages(responseData.numberOfPages);
      }
    } catch(err){}
  }

  useEffect(() => {
    const fetchClients = async () => {
      try{
        const responseData = await sendRequest(`/api/clients/all?numberofresults=${numberOfResults}&page=${page}`);

        setClients(responseData.clients);
        setNumberOfPages(responseData.numberOfPages);
        
      } catch(err){}
    }

    fetchClients();
  }, [sendRequest, numberOfResults, page]);

  const TABLE_HEADERS = [
    'Client Name',
    'Creaton Date',
    'Number of invoices'
  ]

  return (
    <div className='client__list'>
      <ErrorModal error={error} onClear={clearError} />
      <PageHeader viewClient={handleViewClick} deleteClient={handleDeleteClick} buttonsDisabled={rowSelected === 0 ? true : false}/>
      {isLoading && <ActivityIndicator asOverlay />}
      {clients.length !== 0 && <Table headers={TABLE_HEADERS} clients={clients} setRowSelected={handleSelect} rowSelected={rowSelected}/>}

      <TableController numberOfResults={numberOfResults} page={page} setNumberOfResults={setNumberOfResults} setPage={setPage} numberOfPages={numberOfPages}/>
    </div>
  );
}

export default Clients;