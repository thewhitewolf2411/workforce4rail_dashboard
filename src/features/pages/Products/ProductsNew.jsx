import React from "react";

import Input from '../../../app/common/FormElements/Input';
import Button from '../../../app/common/FormElements/Button';

import { VALIDATOR_REQUIRE } from '../../../app/util/validators'; 

import { useForm, useHttpClient } from "../../../app/util/CustomHooks";
import ErrorModal from "../../../app/common/ErrorModal";
import ActivityIndicator from "../../../app/common/ActivityIndicator";
import { useNavigate } from "react-router-dom";

function ProductsNew() {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      productName: {
        value: "",
        isValid: false,
      },
      productHourlyRate: {
        value: "",
        isValid: false,
      },
      productDescription: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  
  const clientSubmitHandler = async (event) => {
    event.preventDefault();

    const body = JSON.stringify({
      productName: formState.inputs.productName.value,
      productHourlyRate: formState.inputs.productHourlyRate.value,
      productDescription: formState.inputs.productDescription.value,
    });

    try {
      await sendRequest(
        "http://localhost:5000/api/products",
        "POST",
        body,
        { "Content-Type": "application/json" }
      );
    } catch (err) {}


    navigate('/products');
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={clientSubmitHandler}>
        {isLoading && <ActivityIndicator asOverlay />}
        <Input
          id="productName"
          element="input"
          type="text"
          label="Product/Service Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
        <Input
          id="productHourlyRate"
          element="input"
          type="number"
          label="Product Hourly Rate [€]"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid number."
          onInput={inputHandler}
        />
        <Input
          id="productDescription"
          label="Product Description"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PRODUCT/SERVICE
        </Button>
      </form>
    </>
  );
}

export default ProductsNew;