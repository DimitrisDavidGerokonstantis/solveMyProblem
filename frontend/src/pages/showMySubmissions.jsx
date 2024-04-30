import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ShowMySubmissions = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const json1 = {
    userID: 1,
    name: "Problem1",
    status: "Ready",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const json2 = {
    userID: 1,
    name: "Problem2",
    status: "Running",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const json3 = {
    userID: 1,
    name: "Problem3",
    status: "Finished",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const jsonArray = [json1, json2, json3];

  /* Possible Statuses and buttons the user can press: */
  // Ready: The user hasn't pressed the run button yet but has uploaded the files and created the problem
  //        Buttons: The user can press the View/Edit button so as to both edit and view, the Run button and the delete button

  // Running: The user has pressed the Run button and the problem has been submitted to the queue and trying to reach the solver
  //        Buttons: The user can press only the View/Edit button and only to view

  // Finished: The problem has finished running and the answers have returned throught the second queue to the user
  //        Buttons: The user can press the View/Edit button so as to only view and the View Results button

  let readabledateCreate = [];
  let readabledateUpdate = [];
  let jsonData = [];
  for (let i = 0; i < jsonArray.length; i++) {
    const json = jsonArray[i];

    const jsonString = JSON.stringify(json);
    jsonData[i] = JSON.parse(jsonString);

    const CreatedOnTimestamp = jsonData[i].createdAt;
    const UpdatedOnTimestamp = jsonData[i].updatedAt;

    const dateCreate = new Date(CreatedOnTimestamp);
    const dateUpdate = new Date(UpdatedOnTimestamp);
    readabledateCreate[i] = dateCreate.toLocaleString();
    readabledateUpdate[i] = dateUpdate.toLocaleString();
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/auth/getToken`);
        setAccessToken(res.data.token);
        console.log("TOKEN", res.data);
        if (res.data.token) {
          setUserId(JSON.parse(localStorage.getItem("user")).id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccessToken();
  }, []);
  if (accessToken) {
    return (
      <div class="bg-orange-50 bg-cover w-screen flex items-center justify-center overflow-scroll">
        <div class="bg-orange-50 bg-cover w-1/12 h-screen flex-col items-center justify-center overflow-scroll"></div>
        <div class=" bg-orange-50 bg-cover w-5/6 h-screen flex-col items-center justify-center overflow-scroll">
          <div className="money w-full shadow-lg ring-1 ring-orange-200">
            <br></br>
            <div className="flex justify-between">
              <h2 className="mt-5 ml-20 text-2xl font-bold text-orange-800 flex-initial">
                My Submissions
              </h2>
              <button
                onClick={() => navigate("/submitproblem")}
                className="mt-5 mr-20 bg-orange-500 text-white rounded-md px-4 py-2 hover:bg-orange-400 transition flex-initial"
              >
                Submit new problem
              </button>
            </div>
            <br></br>
            <br></br>
            <table className="bg-orange-100">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Created On</th>
                  <th>Status</th>
                  <th>View/Edit</th>
                  <th>Last Updated On</th>
                  <th>Run</th>
                  <th>View Results</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {jsonData.map((jsonData, index) => (
                  <tr key={index}>
                    <td>{jsonData.name}</td>
                    <td>{readabledateCreate[0]}</td>
                    <td>{jsonData.status}</td>
                    <td>
                      <button className="bg-orange-900 text-white rounded-md px-4 py-2 hover:bg-orange-700 transition">
                        View/Edit
                      </button>
                    </td>
                    <td>{readabledateUpdate[0]}</td>
                    <td>
                      {jsonData.status === "Ready" ? (
                        <button className="bg-orange-900 text-white rounded-md px-4 py-2 hover:bg-orange-700 transition">
                          Run
                        </button>
                      ) : (
                        <button
                          disabled
                          className="bg-gray-500 text-white rounded-md px-4 py-2 transition opacity-50 cursor-not-allowed"
                        >
                          Run
                        </button>
                      )}
                    </td>
                    <td>
                      {jsonData.status === "Finished" ? (
                        <button className="bg-orange-900 text-white rounded-md px-4 py-2 hover:bg-orange-700 transition">
                          View Results
                        </button>
                      ) : (
                        <button
                          disabled
                          className="bg-gray-500 text-white rounded-md px-4 py-2 transition opacity-50 cursor-not-allowed"
                        >
                          View Results
                        </button>
                      )}
                    </td>
                    <td>
                      {jsonData.status === "Ready" ? (
                        <button
                          className="bg-rose-500 text-white rounded-md px-4 py-2 hover:bg-rose-700 transition"
                          onClick={openModal}
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          disabled
                          className="bg-gray-500 text-white rounded-md px-4 py-2 transition opacity-50 cursor-not-allowed"
                          onClick={openModal}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
                <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-xl">
                  <div className="flex justify-end p-2">
                    <button
                      onClick={closeModal}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      class="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      {" "}
                      Delete Item{" "}
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        {" "}
                        Are you sure you want to delete{" "}
                        <span class="font-bold">Sample Item</span>? This action
                        cannot be undone.{" "}
                      </p>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                      {" "}
                      Delete{" "}
                    </button>
                    <button
                      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={closeModal}
                    >
                      {" "}
                      Cancel{" "}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div class="bg-orange-50 bg-cover w-1/12 h-screen flex-col items-center justify-center overflow-scroll"></div>
      </div>
    );
  } else {
    return (
      <div class="bg-orange-50 bg-cover w-screen h-screen flex justify-center">
        <h3 className="mt-40 text-4xl font-semibold">You have to login!</h3>
      </div>
    );
  }
};

export default ShowMySubmissions;
