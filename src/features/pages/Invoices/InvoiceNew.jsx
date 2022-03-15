import React, { useEffect, useState } from "react";

import Input from '../../../app/common/FormElements/Input';
import Button from '../../../app/common/FormElements/Button';
import add_btn from '../../../assets/add_btn.png';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL} from '../../../app/util/validators'; 

import { useForm, useHttpClient } from "../../../app/util/CustomHooks";
import ErrorModal from "../../../app/common/ErrorModal";
import { useNavigate } from "react-router-dom";
import ActivityIndicator from "../../../app/common/ActivityIndicator";
import Card from "../../../app/common/Card";

function InvoiceNew() {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      invoiceTitle: {
        value: "",
        isValid: false
      },
      clientId: {
        value: "",
        isValid: false,
      },
      services: {
        value: [],
        isValid: false,
      }
    },
    false
  );

  const invoiceSubmitHandler = async (event) => {
    event.preventDefault();

    const body = JSON.stringify({
      invoiceTitle: formState.inputs.invoiceTitle.value,
      clientId: formState.inputs.clientId.value,
      services: formState.inputs.services.value,
    })

    try {
      await sendRequest(
        "http://localhost:5000/api/invoices",
        "POST",
        body,
        { "Content-Type": "application/json" }
      );
    } catch (err) {}
  };

  const addServiceHandler = () => {
    const service = {
      id: Math.floor(Math.random() * 100000),
      productId: "",
      quantity: "",
    }
    setSelectedServices((selectedServices) => selectedServices.concat(service));
  }

  const selectServiceHandler = (value, id) => {
    const service = selectedServices.find(service => service.id === id);
    const index = selectedServices.indexOf(service);
    service.productId = value;

    let oldservices = selectedServices;
    oldservices[index] = service;

    setSelectedServices(oldservices);
    setFormData(
      {
        invoiceTitle: {
          value: formState.inputs.invoiceTitle.value,
          isValid: formState.inputs.invoiceTitle.isValid,
        },
        clientId: {
          value: formState.inputs.clientId.value,
          isValid: formState.inputs.clientId.isValid,
        },
        services: {
          value: oldservices,
          isValid: oldservices.length > 0,
        }
      },
      formState.inputs.clientId.isValid && oldservices.length > 0
    )

  }

  const addQuantityHandler = (value, id) => {
    const service = selectedServices.find(service => service.id === id);
    const index = selectedServices.indexOf(service);
    service.quantity = value;

    let oldservices = selectedServices;
    oldservices[index] = service;

    setSelectedServices(oldservices);
    setFormData(
      {
        invoiceTitle: {
          value: formState.inputs.invoiceTitle.value,
          isValid: formState.inputs.invoiceTitle.isValid,
        },
        clientId: {
          value: formState.inputs.clientId.value,
          isValid: formState.inputs.clientId.isValid,
        },
        services: {
          value: oldservices,
          isValid: oldservices.length > 0,
        }
      },
      formState.inputs.clientId.isValid && oldservices.length > 0
    )
  }

  useEffect(() => {
    const fetchClients = async () => {
      try{
        const responseData = await sendRequest(`http://localhost:5000/api/clients/all`);

        setClients(responseData.clients);
        
      } catch(err){}
    }
    const fetchProducts = async () => {
      try{
        const responseData = await sendRequest(`http://localhost:5000/api/products/all`);

        setProducts(responseData.products);
        
      } catch(err){}
    }

    fetchClients();
    fetchProducts();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={invoiceSubmitHandler}>
        {isLoading && <ActivityIndicator asOverlay />}

        <Input
          id="invoiceTitle"
          element="input"
          type="text"
          label="Invoice Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid invoice name."
          onInput={inputHandler}
        />

        <div className="form-control">
          <select id="clientId" defaultValue={''} onChange={(event) => inputHandler('clientId', event.target.value, true)}>
              <option value={''} disabled>Please select a client</option>
              {clients.map((client) => {
                return(<option key={client.id} value={client.id}>{client.name}</option>);
              })}
          </select>
        </div>

        {selectedServices.map((selectedservice) => {
          return(
            <Card key={selectedservice.id} style={{marginBottom: '1em'}}>
              <div className="form-control">
                <select id={`productId-${selectedservice.id}`} defaultValue={''} onChange={(event) => selectServiceHandler(event.target.value, selectedservice.id)}>
                    <option value={''} disabled>Please select a product</option>
                    {products.map((product) => {
                      return(<option key={product.id} value={product.id}>{product.productName}</option>);
                    })}
                </select>

              </div>
              <div className="form-control">
                <input
                  onChange={event => addQuantityHandler(event.target.value, selectedservice.id)}
                  type={"number"}
                />
              </div>

            </Card>
          );
        })}

        <div className="form-control form-control__center">
          <h5>Add new service</h5>
          <img src={add_btn} alt='Add new product' title='Add new product' onClick={addServiceHandler}/>
        </div>

        <Button type="submit" disabled={!formState.isValid}>
          CREATE INVOICE
        </Button>
      </form>
    </>

  );
}

export default InvoiceNew;