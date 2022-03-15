import React from "react";

import Input from '../../../app/common/FormElements/Input';
import Button from '../../../app/common/FormElements/Button';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL} from '../../../app/util/validators'; 

import { useForm, useHttpClient } from "../../../app/util/CustomHooks";
import ErrorModal from "../../../app/common/ErrorModal";
import ActivityIndicator from "../../../app/common/ActivityIndicator";
import { useNavigate } from "react-router-dom";

function ClientNew() {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
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
        "http://localhost:5000/api/clients",
        "POST",
        body,
        { "Content-Type": "application/json" }
      );
    } catch (err) {}

    navigate('/clients');
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Client Address"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Input
          id="email"
          element="input"
          type="email"
          label="Client Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          id="contact_person"
          element="input"
          type="text"
          label="Contact Person"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid contact person."
          onInput={inputHandler}
        />
        <Input
          id="client_id"
          element="input"
          type="text"
          label="Client ID"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          id="description"
          label="Client Description"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD CLIENT
        </Button>
      </form>
    </>

  );
}

export default ClientNew;