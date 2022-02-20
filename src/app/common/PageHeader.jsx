import React from "react";
import Button from "./Button";
import TextInput from "./TextInput";

function PageHeader() {

  return (
    <div className='page__header'>
      <TextInput placeholder='Search'/>
      <div className='buttons'>
        <Button delete={true} />
        <Button new={true} link={''}/>
      </div>

    </div>
  );
}

export default PageHeader;