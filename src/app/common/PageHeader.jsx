import React from "react";
import Button from "./Button";
import TextInput from "./TextInput";

function PageHeader({viewClient, deleteClient, buttonsDisabled}) {

  return (
    <div className='page__header'>
      <TextInput placeholder='Search'/>
      <div className='buttons'>
        <Button delete={true} disabled={buttonsDisabled} action={deleteClient} />
        <Button view={true} disabled={buttonsDisabled} action={viewClient}/>
        <Button new={true} link={''}/>
      </div>

    </div>
  );
}

export default PageHeader;