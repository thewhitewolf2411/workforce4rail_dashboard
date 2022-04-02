import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'
import ActivityIndicator from "../../../app/common/ActivityIndicator";
import ErrorModal from "../../../app/common/ErrorModal";

import PageHeader from "../../../app/common/PageHeader";
import Table from "../../../app/common/table/Table";
import TableController from "../../../app/common/table/TableController";
import { useHttpClient } from "../../../app/util/CustomHooks";

function Products() {

  const [numberOfResults, setNumberOfResults] = useState(10);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [rowSelected, setRowSelected] = useState(0);
  const [products, setProducts] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate('/product/' + rowSelected);
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
        deleteProduct();
      }
      else if(result.isDenied){
        Swal.fire('Client not deleted.', '', 'info')
      }
    })
  }

  const deleteProduct = async () => {
    try{
      const deleteResponseData = await sendRequest(`/api/products/${rowSelected}`, 'DELETE', null, { "Content-Type": "application/json"});
      if(deleteResponseData.status === 200){
        Swal.fire('Client deleted succesfully.', '', 'success');
        const responseData = await sendRequest(`/api/products/all?numberofresults=${numberOfResults}&page=${page}`);

        setProducts(responseData.clients);
        setNumberOfPages(responseData.numberOfPages);
      }
    } catch(err){}
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const responseData = await sendRequest(`/api/products/all?numberofresults=${numberOfResults}&page=${page}`);

        setProducts(responseData.products);
        setNumberOfPages(responseData.numberOfPages);
        
      } catch(err){}
    }

    fetchProducts();
  }, [sendRequest, numberOfResults, page]);

  const TABLE_HEADERS = [
    'Product/Service Name',
    'Product Hourly Rate [€]',
    'Total Number of invoices',
    'Total Earnings'
  ]

  return (
    <div className='products__list'>
      <ErrorModal error={error} onClear={clearError} />
      <PageHeader viewClient={handleViewClick} deleteClient={handleDeleteClick} buttonsDisabled={rowSelected === 0 ? true : false}/>
      {isLoading && <ActivityIndicator asOverlay />}
      {products.length !== 0 && <Table headers={TABLE_HEADERS} products={products} setRowSelected={handleSelect} rowSelected={rowSelected}/>}
      
      <TableController numberOfResults={numberOfResults} page={page} setNumberOfResults={setNumberOfResults} setPage={setPage} numberOfPages={numberOfPages}/>
    </div>
  );
}

export default Products;