import React from "react";

import Input from '../../../app/common/FormElements/Input';
import Button from '../../../app/common/FormElements/Button';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL} from '../../../app/util/validators'; 

import { useForm } from "../../../app/util/form-hook";

function ClientNew() {

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
      }
    },
    false
  );

  const clientSubmitHandler = (event) => {
    event.preventDefault();

    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={clientSubmitHandler}>
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
        id="id"
        element="input"
        type="text"
        label="Client ID"
        validators={[VALIDATOR_EMAIL()]}
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
        ADD PLACE
      </Button>
    </form>
  );
}

export default ClientNew;