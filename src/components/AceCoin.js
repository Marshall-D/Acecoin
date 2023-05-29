import React from "react";
import "../styles/Acecoin.css";
import CloseButton from "./CloseButton.";
import Checkout from "./Checkout";
import Form from "./Form";


const AceCoin = () => {
  

  return (
    <div className="body">
      <div className="wrapper grid grid-cols-12">
       <CloseButton/>
       <Form/>
      <Checkout/>
      </div>
    </div>
  );
};

export default AceCoin;
