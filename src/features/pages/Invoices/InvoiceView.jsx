import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useHttpClient } from "../../../app/util/CustomHooks";
import Button from "../../../app/common/FormElements/Button";
import Modal from "../../../app/common/Modal";
import ActivityIndicator from "../../../app/common/ActivityIndicator";

function InvoiceView() {

  const {id} = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [client, setClient] = useState(null);
  const [file, setFile] = useState(null);

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

  const clearIframe = () => {
    setFile(null);
  }

  useEffect(() => {
    const fetchInvoice = async () => {
      try{
        const responseData = await sendRequest(`/api/invoices/${id}`);
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

    fetchInvoice();
  }, [sendRequest, id, setFormData]);

  const printInvoiceHandler = async () => {

    const body = JSON.stringify({invoiceId: id});

    const responseData = await sendRequest('/api/invoices/print', 'POST', body, { "Content-Type": "application/json" });
    setFile(responseData.file);
  }

  return (
    <>
      {isLoading && <ActivityIndicator asOverlay />}
      <Button onClick={printInvoiceHandler}>Print invoice</Button>
      {!!file && <Modal header={"Invoice"} className="iframe__modal" show={!!file} onCancel={clearIframe}><iframe src={'data:application/pdf;base64,' + file} width="800px" height="1000px"></iframe></Modal>}
    </>
  );
}

export default InvoiceView;