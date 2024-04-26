import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { CopyBlock,dracula } from 'react-code-blocks';
import { useLocation } from "react-router-dom";
import axios from "axios";

const NewSubmission = () => {
    const [showModalInput, setShowModalInput] = React.useState(false);
    const [showModalScript, setShowModalScript] = React.useState(false);
    const [file1Error, setFile1Error]=useState("")
    const [file2Error, setFile2Error]=useState("")
    const [inputDataFile, setInputDataFile]=useState("")
    const [inputScriptFile, setInputScriptFile]=useState("")
    const [inputDataFileName, setInputDataFileName]=useState("")
    const [inputScriptFileName, setInputScriptFileName]=useState("")
    const [textContent1,setTextContent1]=useState("");
    const [textContent2,setTextContent2]=useState("");
    const [model,setModel]=useState("No model selected") 
    const [isOpen,setIsOpen] = useState(true); // Set to true to open the dropdown by default
    const models=['No model selected', 'Model 1 : Vehicle Routing Problem (VRP)','Model 2 : Solve problem 2','Model 3 : Solve problem 3','Model 4 : Solve problem 4']
    const [dropDownClass,setDropdownClass]=useState("hidden rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1")
    const [numVehicles, setNumVehicles]=useState("")
    const [vehiclesError, setVehiclesError]=useState("")
    const [depot, setDepot]=useState("")
    const [depotError, setDepotError]=useState("")
    const [maxDistance,setMaxDistance]=useState("")
    const [distanceError, setDistanceError]=useState("")
    const [submitError,setSubmitError]=useState("")

    const numberRegex = /^[0-9]+$/;

    console.log(inputDataFile.length, inputScriptFile.length);
    function MyCoolCodeBlock({ code, language, showLineNumbers }) {
      return(
        <div class="ml-10 mr-10">
      <CopyBlock
        text={code}
        language={language}
        showLineNumbers={showLineNumbers}
        theme={dracula}
        codeBlock
      /></div>);
    }
    

    function toggleDropdown() {
        setIsOpen(!isOpen)
        if(isOpen){
            setDropdownClass("rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1")
        }
        else{
            setDropdownClass("hidden rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1")
        }
    }
    
    const handleDropdownClick=()=>{
        toggleDropdown();
    }

    const handleSearch=(e)=>{
      
    const searchTerm = e.target.value.toLowerCase();
    const items = document.getElementById('dropdown-menu').querySelectorAll('a');
    items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
        item.style.display = 'block';
        } else {
        item.style.display = 'none';
        }
    });
    }



    const handleDragOver=(e)=>{
        e.preventDefault();
        e.target.classList.add('border-orange-500', 'border-2');
    }

    const handleDragLeave=(e)=>{
        e.target.classList.remove('border-orange-500', 'border-2');
    }
    

    const handleDrop=(e)=>{
        e.preventDefault();
        e.target.classList.remove('border-orange-500', 'border-2');
        const files = e.dataTransfer.files;
        console.log(e.target)
        if(e.target.id=='dropzone1'){
            handleFiles(files, 1);
        }
        else{
            handleFiles(files, 2);
        }
        
    }
    

    const handleInputChange=(e)=>{
        const files = e.target.files;
        if(e.target.id=='fileInput'){
            handleFiles(files, 1);
        }
        else{
            handleFiles(files, 2);
        }
    }
    
    function handleFiles(files, id) {
        for (const file of files) {
            if((file.name.split(".")[1]!="json" && id==1)||(file.name.split(".")[1]!="py" && id==2)){
                
                if((file.name.split(".")[1]!="json" && id==1)){setInputDataFile("");setInputDataFileName("");setFile1Error("Not valid file format!")}
                if((file.name.split(".")[1]!="py" && id==2)){setInputScriptFile("");setInputScriptFileName("");setFile2Error("Not valid file format!")}

                return
            }
            setFile1Error("");
            setFile2Error("")
            const reader = new FileReader();
            if (file.type === 'text/x-python' || file.name.endsWith('.py')) {
                reader.onload = function(event) {
                    const contents = event.target.result;
                    if(id==2){
                      setInputScriptFile(contents)
                      setInputScriptFileName(file.name)
                      setTextContent2(`${file.name} (${formatBytes(file.size)})`)
                    }
                };
                reader.readAsText(file);
            };
            if (file.type === 'application/json' || file.name.endsWith('.json')) {
              reader.onload = function(event) {
                  const contents = event.target.result;
                  if(id==1){
                    setInputDataFile(contents)
                    setInputDataFileName(file.name)
                    setTextContent1(`${file.name} (${formatBytes(file.size)})`)
                  }
              };
              reader.readAsText(file);
            };
            
        }
    }
    
    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const handleSubmit=async(e)=>{
      e.preventDefault();
      setSubmitError("")
      if(inputDataFile==="" || inputScriptFile==="" || numVehicles==="" || depot===""|| maxDistance===""){
        setSubmitError("Missing values!")
      }
      if(vehiclesError!=="" || depotError!=="" || distanceError!=="" ||file1Error!="" || file2Error!="")
        setSubmitError("Some fields are not correct. Try again!")
      
      
      if(submitError===""){
        try {
          console.log(typeof inputScriptFile)
          const res=await axios.post(`http://localhost:8080/api/submitProblem/submit`,  
          {
            userID:1,
            pythonScript: {script: `${inputScriptFile}`},
            inputDataFile: JSON.parse(inputDataFile),
            status: "submitted",
          })
          console.log("DATA",res.data.problem)
        } catch (error) {
          console.log(error)
        }
      }
      
      
      
      }

    const handleVehicles=(e)=>{
      setNumVehicles(e.target.value)
      if(!e.target.value.match(numberRegex) && e.target.value!==""){
        setVehiclesError("Must be a number!")
      }
      else{
        setVehiclesError("")
      }
    }

    const handleDepot=(e)=>{
      setDepot(e.target.value)
      if(!e.target.value.match(numberRegex) && e.target.value!==""){
        setDepotError("Must be a number!")
      }
      else{
        setDepotError("")
      }
    }

    const handleDistance=(e)=>{
      setMaxDistance(e.target.value)
      if(!e.target.value.match(numberRegex) && e.target.value!==""){
        setDistanceError("Must be a number!")
      }
      else{
        setDistanceError("")
      }
    }
    


    return(
    <React.Fragment>
        <div class=" bg-orange-50 bg-cover w-screen h-screen flex-col items-center justify-center overflow-scroll">
            <div class="flex flex-col justify-center items-center relative"> 
                <span class="flex mt-10 text-xl">Choose the solver's model that you want to use</span>
                <button onClick={handleDropdownClick} id="dropdown-button" class="mb-2 mt-10 w-fit inline-flex justify-center px-4 py-2 text-sm font-medium text-orange-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-yellow-900">
                    <span class="mr-4">{model}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
                <div id="dropdown-menu" class={dropDownClass}> 
                    <input onChange={handleSearch} id="search-input" class="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Search for models" autocomplete="off"/>
                    {/* <a href="#" class="w-max block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Model 1 : Solve the problem 1</a>
                    <a href="#" class="w-full block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Model 2</a>
                    <a href="#" class="w-full block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Model 3</a>
                    <a href="#" class="w-full block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Model 4</a> */}
                    {models.map((model,index)=>{
                        return(
                            <a key={index} onClick={()=>{setModel(model);toggleDropdown()}} href="#" class="w-max block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">{model}</a>
                        )
                    })}
                </div>
            </div>


                
            {model==="Model 1 : Vehicle Routing Problem (VRP)" && isOpen && <div class="flex justify-center items-start gap-5 mt-20">

                <div class="w-fit max-w-md p-9 bg-orange-100 rounded-lg shadow-lg mb-10">
                    <h1 class="text-center text-2xl sm:text-2xl font-semibold mb-4 text-gray-800">Upload the file containing the input data (.json)</h1>
                    <div class="bg-gray-100 p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-orange-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md" id="dropzone1" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                        <label id="dropzone1" for="fileInput" class="cursor-pointer flex flex-col items-center space-y-2">
                            <svg id="dropzone1" class="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            <span id="dropzone1" class="text-gray-600">Drag and drop your files here</span>
                            <span id="dropzone1" class="text-gray-500 text-sm">(or click to select)</span>
                        </label>
                        <input type="file" id="fileInput" class="hidden" onChange={handleInputChange}/>

                    </div>
                   {inputDataFile&& <div class="mt-6 text-center" id="fileList1">
                    <p class="flex flex-col mb-2">{textContent1}</p>      <button
                className="bg-orange-900 text-white hover:bg-orange-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModalInput(true)}
              >
                Open input data file
              </button>
                    </div>}
                    <p class="flex flex-col mb-2 text-center text-red-500 mt-5">{file1Error}</p>
                </div>
                
                <div class="w-fit max-w-md p-9 bg-orange-100 rounded-lg shadow-lg mb-10">
                    <h1 class="text-center text-2xl sm:text-2xl font-semibold mb-4 text-gray-800">Upload the script (.py) to be executed</h1>
                    <div class="bg-gray-100 p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-orange-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md" id="dropzone2" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                        <label id="dropzone2" for="fileInput2" class="cursor-pointer flex flex-col items-center space-y-2">
                            <svg id="dropzone2" class="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            <span id="dropzone2" class="text-gray-600">Drag and drop your files here</span>
                            <span id="dropzone2" class="text-gray-500 text-sm">(or click to select)</span>
                        </label>
                        <input type="file" id="fileInput2" class="hidden" onChange={handleInputChange}/>
                    </div>
                    {inputScriptFile&&<div class="mt-6 text-center" id="fileList2">
                    <React.Fragment><p class="flex flex-col mb-2">{textContent2}</p><button
                className="bg-orange-900 text-white hover:bg-orange-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModalScript(true)}
              >
                Open script
              </button></React.Fragment>
                    </div>}
                    <p class="flex flex-col mb-2 text-center text-red-500 mt-5">{file2Error}</p>

                </div>
            </div>}
            {/* <div class="flex flex-col justify-center items-center relative p-10 mt-10 bg-white rounded-lg shadow-lg gap-3"> 
                    <p class="text-center text-2xl sm:text-2xl font-semibold mb-4 text-gray-800">Chosen Solver's Model</p>
                    <p class="text-center text-xl sm:text-xl font-semibold mb-4 text-gray-800">{model}</p>
            </div> */}
            {model==="Model 1 : Vehicle Routing Problem (VRP)" && isOpen &&(<div class="gap-10 mt-10 flex justify-center items-center relative"> 
            <div class="flex flex-col justify-center items-center relative"> 
            <label class="mb-3 block font-extrabold" for="num_vehicles">Number of vehicles</label>
            <input  onChange={handleVehicles} id="num_vehicles" class="inline-block w-full rounded-full bg-orange-100 p-2.5 leading-none text-center text-orange-900 placeholder-yellow-900 shadow placeholder:opacity-40" placeholder="number of vehicles" />
            <p class="absolute flex flex-col mb-2 text-center text-red-500 mt-40">{vehiclesError}</p>
            </div>
         
            <div class="flex flex-col justify-center items-center relative"> 
            <label class="mb-3 block font-extrabold" for="depot">Depot</label>
            <input  onChange={handleDepot} id="depot" class="inline-block w-full rounded-full bg-orange-100 p-2.5 leading-none text-center text-orange-900 placeholder-yellow-900 shadow placeholder:opacity-40" placeholder="depot" />
            <p class="absolute flex flex-col mb-2 text-center text-red-500 mt-40">{depotError}</p>

            </div>

            <div class="flex flex-col justify-center items-center relative"> 
            <label class="mb-3 block font-extrabold" for="max_distance">Maximum Distance</label>
            
            <input onChange={handleDistance} id="max_distance" class="inline-block w-full rounded-full bg-orange-100 p-2.5 leading-none text-center text-orange-900 placeholder-yellow-900 shadow placeholder:opacity-40" placeholder="maximum distance" />
            <p class="absolute flex flex-col mb-2 text-center text-red-500 mt-40">{distanceError}</p>

            </div>
            
          </div>)}
          {model==="Model 1 : Vehicle Routing Problem (VRP)" && isOpen && <div class="flex flex-col justify-center items-center"> 
            <button
                className="mt-20 text-orange-900 rounded-full bg-red-300 hover:bg-orange-400 font-bold uppercase px-8 py-4 text-sm outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                type="button"
                onClick={handleSubmit}
              >
                Submit
            </button>
            <p class="mt-2 mb-10 flex flex-col text-center text-red-500 ">{submitError}</p>

        </div>}
        </div>




        <>

      {showModalInput ? (
        <>
          <div
            className="mt-10 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="mt-60 flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Input data file
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalInput(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto ">
                <p className="my-4 text-blueGray-500 text-sm leading-relaxed overflow-y-scroll h-screen">
                  {MyCoolCodeBlock({code:inputDataFile,language:'python', showLineNumbers:true})}

                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-orange-900 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalInput(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>





    <>

    {showModalScript ? (
  <>
    <div className="mb-10 h-screen fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg relative mt-10">
          {/*header*/}
          <div className="mt-60 flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              Python Script
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModalScript(false)}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="overflow-y-auto mt-10">
            <p className="text-blueGray-500 text-sm leading-relaxed overflow-y-scroll h-screen">
              {MyCoolCodeBlock({code:inputScriptFile,language:'python', showLineNumbers:true})}
            </p>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-orange-900 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModalScript(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
) : null}
    </>

    </React.Fragment>
    )


};

export default NewSubmission;