import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL} from '../../../app/util/validators'; 

import Button from "../../../app/common/FormElements/Button";
import ErrorModal from "../../../app/common/ErrorModal";
import Input from "../../../app/common/FormElements/Input";

import { useForm, useHttpClient } from "../../../app/util/CustomHooks";
import ActivityIndicator from "../../../app/common/ActivityIndicator";

function ClientView() {

  const {id} = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [client, setClient] = useState(null);

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      contact_person: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      client_id: {
        value: "",
        isValid: false,
      }
    },
    false
  );

  useEffect(() => {
    const fetchClients = async () => {
      try{
        const responseData = await sendRequest(`/api/clients/${id}`);
        setClient(responseData.client);
        setFormData({
            name: {
              value: client.name,
              isValid: true,
            },
            address: {
              value: client.address,
              isValid: true,
            },
            email: {
              value: client.email,
              isValid: true,
            },
            contact_person: {
              value: client.contact_person,
              isValid: true,
            },
            description: {
              value: client.description,
              isValid: true,
            },
            client_id: {
              value: client.client_id,
              isValid: true,
            }
          },
          true
        );
      } catch(err){}
    }

    fetchClients();
  }, [sendRequest, id, setFormData]);

  const clientSubmitHandler = async (event) => {
    event.preventDefault();

    const body = JSON.stringify({
      name: formState.inputs.name.value,
      address: formState.inputs.address.value,
      email: formState.inputs.email.value,
      contact_person: formState.inputs.contact_person.value,
      client_id: formState.inputs.client_id.value,
      description: formState.inputs.description.value,
    })

    try {
      await sendRequest(
        `/api/clients/${id}`,
        "PATCH",
        body,
        { "Content-Type": "application/json" }
      );
    } catch (err) {}

    Swal.fire('Client edited succesfully.', '', 'success');

    navigate('/clients');
  };

  const switchToEditModeHandler = () => {
    if(editMode){
      navigate(`/clients`);
    }
    else{
      setEditMode(true);
    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Button onClick={switchToEditModeHandler} inverse={editMode ? false : true}>
        {editMode ? "DISCARD CHANGES" : "EDIT CLIENT"}
      </Button>
      {client !== null &&
      <form className="place-form" onSubmit={clientSubmitHandler}>
        {isLoading && <ActivityIndicator asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Client Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
          disabled={!editMode}
          initialValue={client.name}
          initialValid={true}
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Client Address"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
          disabled={!editMode}
          initialValue={client.address}
          initialValid={true}
        />
        <Input
          id="email"
          element="input"
          type="email"
          label="Client Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
          disabled={!editMode}
          initialValue={client.email}
          initialValid={true}
        />
        <Input
          id="contact_person"
          element="input"
          type="text"
          label="Contact Person"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid contact person."
          onInput={inputHandler}
          disabled={!editMode}
          initialValue={client.contact_person}
          initialValid={true}
        />
        <Input
          id="client_id"
          element="input"
          type="text"
          label="Client ID"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
          disabled={!editMode}
          initialValue={client.client_id}
          initialValid={true}
        />
        <Input
          id="description"
          label="Client Description"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description."
          onInput={inputHandler}
          disabled={!editMode}
          initialValue={client.description}
          initialValid={true}
        />
        {editMode && 
        <Button type="submit" disabled={!formState.isValid}>
          SUBMIT CHANGES
        </Button>
        }
      </form>}
    </>
  );
}

export default ClientView;