import React, { useState } from 'react'
import "./Verify.css"
import {useSearchParams} from 'react-router-dom'

const Verify = () => {

    const [searchParam, setSearchParam] = useSearchParams();
    const success = searchParam.get("success");
    const orderId = searchParam.get("orderId");

    console.log(success, orderId);

  return (
    <div>
      
    </div>
  )
}

export default Verify
