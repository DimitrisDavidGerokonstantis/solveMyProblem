//Loading Spinner from : https://contactmentor.com/how-to-add-loading-spinner-react-js/

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const DummyPage = () => {

  const [message,setMessage]=useState("");

  const handleClick=async(e)=>{
    e.preventDefault();
    try {
        const res=await axios.get(`http://localhost:8080/api/submitProblem/dummy`)
        console.log(res.data)
        setMessage(res.data.message)
    } catch (error) {
        console.log(error)
    }

  }

  return (
    <div className="parthome">

      <button onClick={handleClick}>OK</button>
      <p>{message}</p>

    </div>
  );
};

export default DummyPage;