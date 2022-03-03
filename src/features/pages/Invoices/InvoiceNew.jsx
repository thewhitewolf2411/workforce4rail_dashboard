import React from "react";

import Input from '../../../app/common/FormElements/Input';
import Button from '../../../app/common/FormElements/Button';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL} from '../../../app/util/validators'; 

import { useForm } from "../../../app/util/form-hook";

function InvoiceNew() {

  const clientSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form className="place-form" onSubmit={clientSubmitHandler}>

    </form>
  );
}

export default InvoiceNew;