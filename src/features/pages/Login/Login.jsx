import React, { useContext } from "react";

import Card from "../../../app/common/Card";
import ErrorModal from "../../../app/common/ErrorModal";
import ActivityIndicator from "../../../app/common/ActivityIndicator";
import Button from "../../../app/common/FormElements/Button";
import Input from "../../../app/common/FormElements/Input";

import { useForm, useHttpClient } from "../../../app/util/CustomHooks";
import { AuthContext } from "../../../app/util/AuthContext";
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL} from '../../../app/util/validators'; 
import { useNavigate } from "react-router-dom";

function Login() {

  const auth = useContext(AuthContext);
  let navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

      try {
        const responseData = await sendRequest(
          "/api/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );

        auth.login(responseData.userId, responseData.token);
        navigate('/dashboard');
      } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
      {isLoading && <ActivityIndicator asOverlay />}
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password address, at least 6 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            LOGIN
          </Button>
        </form>
      </Card>
    </>
  );
}

export default Login;