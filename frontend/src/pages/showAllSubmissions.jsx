import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ShowAllSubmissions = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [problems, setProblems] = useState([]);
  const [toBeDeleted, setToBeDeleted] = useState("");

  const [problemDeleted, setProblemDeleted] = useState(false);
  // const json1 = {
  //   userID: 1,
  //   name: "Problem1",
  //   status: "Ready",
  //   createdAt: Date.now(),
  //   updatedAt: Date.now(),
  // };

  // const json2 = {
  //   userID: 1,
  //   name: "Problem2",
  //   status: "Running",
  //   createdAt: Date.now(),
  //   updatedAt: Date.now(),
  // };

  // const json3 = {
  //   userID: 1,
  //   name: "Problem3",
  //   status: "Finished",
  //   createdAt: Date.now(),
  //   updatedAt: Date.now(),
  // };

  // const jsonArray = [json1, json2, json3];

  /* Possible Statuses and buttons the admin can press - he cannot run a problem a user has created: */
  // Ready: The user hasn't pressed the run button yet but has uploaded the files and created the problem
  //        Buttons: The admin can press the View button so as to view the problem and the delete button

  // Running: The user has pressed the Run button and the problem has been submitted to the queue and trying to reach the solver
  //        Buttons: The admin can press the View button to view the problem and the delete button to delete a problem (if there is need to do that)

  // Finished: The problem has finished running and the answers have returned through the second queue to the user
  //        Buttons: The admin can press the View button so as to view the problem and the View Results button to view the results

  // let readabledateCreate = [];
  // let readabledateUpdate = [];
  // let jsonData = [];
  // for (let i = 0; i < jsonArray.length; i++) {
  //   const json = jsonArray[i];

  //   const jsonString = JSON.stringify(json);
  //   jsonData[i] = JSON.parse(jsonString);

  //   const CreatedOnTimestamp = jsonData[i].createdAt;
  //   const UpdatedOnTimestamp = jsonData[i].updatedAt;

  //   const dateCreate = new Date(CreatedOnTimestamp);
  //   const dateUpdate = new Date(UpdatedOnTimestamp);
  //   readabledateCreate[i] = dateCreate.toLocaleString();
  //   readabledateUpdate[i] = dateUpdate.toLocaleString();
  // }

  const [ReadyToRefresh, setReadyToRefresh] = useState(false);

  useEffect(() => {
    if (!ReadyToRefresh) {
      const timer = setTimeout(() => {
        setReadyToRefresh(true); // Revert the boolean variable after 2 seconds
      }, 1000);

      return () => clearTimeout(timer); // Clean up the timer to avoid memory leaks
    }
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const openModal = (id) => {
    setIsModalOpen(true);
    setToBeDeleted(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteProblem = async () => {
    const res = await axios.post(`http://localhost:8080/api/deleteProblem`, {
      id: toBeDeleted,
    });
    closeModal();
    console.log("Problem Deleted!");
    setProblemDeleted(!problemDeleted);
  };

  const makeDatesReadable = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    const options = {
      timeZone: "Europe/Athens",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const timeString = date.toLocaleTimeString("el-GR", options);

    const formattedDate = `${year}-${month}-${day} ${timeString}`;
    return formattedDate;
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/auth/getToken`);
        setAccessToken(res.data.token);
        setRole(res.data.role);
        console.log("TOKEN", res.data);
        if (res.data.token) {
          setUserId(JSON.parse(localStorage.getItem("user")).id);
        } else {
          setAccessToken(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccessToken();
  }, []);

  useEffect(() => {
    const fetchMySubmissions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/admin/showSubmissions`
        );
        setProblems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMySubmissions();
  }, [problemDeleted, ReadyToRefresh]);

  console.log(accessToken);
  if (accessToken === null) {
    return (
      <div class="bg-orange-50 bg-cover w-screen h-screen flex items-center justify-center overflow-auto">
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-20 h-20 text-gray-200 animate-spin dark:text-gray-300 fill-orange-800"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  if (accessToken && role != "user") {
    return (
      <div class="bg-orange-50 bg-cover w-screen flex items-center justify-center overflow-auto">
        <div class="bg-orange-50 bg-cover w-1/12 h-screen flex-col items-center justify-center"></div>
        <div class=" bg-orange-50 bg-cover w-5/6 h-screen flex-col items-center justify-center overflow-auto ">
          <div className="money w-full shadow-lg ring-1 ring-orange-200 ">
            <br></br>
            <div className="flex justify-between">
              <h2 className="mt-5 ml-20 text-2xl font-bold text-orange-800 flex-initial">
                Submissions
              </h2>
            </div>
            <br></br>
            <br></br>
            <table className="bg-orange-100 ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Created On</th>
                  <th>Status</th>
                  <th>View</th>
                  <th>Last Updated On</th>
                  <th>View Results</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {problems.length > 0 ? (
                  problems.map((problem, index) => (
                    <tr key={index}>
                      <td>{problem.name}</td>
                      <td>{makeDatesReadable(problem.createdAt)}</td>
                      <td>{problem.status}</td>
                      <td>
                        <button
                          onClick={() =>
                            navigate(
                              `/editproblem/${problem._id}?viewOnly=true`
                            )
                          }
                          className="bg-orange-900 text-white rounded-md px-4 py-2 hover:bg-orange-700 transition"
                        >
                          View
                        </button>
                      </td>
                      <td>{makeDatesReadable(problem.updatedAt)}</td>
                      <td>
                        {problem.status === "finished" ? (
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
                        {problem.status === "ready" ||
                        problem.status === "Running" ? (
                          <button
                            className="bg-rose-500 text-white rounded-md px-4 py-2 hover:bg-rose-700 transition"
                            onClick={() => openModal(problem._id)}
                          >
                            Delete
                          </button>
                        ) : (
                          <button
                            disabled
                            className="bg-gray-500 text-white rounded-md px-4 py-2 transition opacity-50 cursor-not-allowed"
                            onClick={() => openModal(problem._id)}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">
                      No problems have been found. Refresh the page to try
                      again!
                    </td>
                  </tr>
                )}
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
                    <button
                      onClick={handleDeleteProblem}
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
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
        <div class="bg-orange-50 bg-cover w-1/12 h-screen flex-col items-center justify-center"></div>
      </div>
    );
  } else {
    return (
      <div class="bg-orange-50 bg-cover w-screen h-screen flex justify-center">
        <h3 className="mt-40 text-4xl font-semibold">
          You have to login with a valid user account!
        </h3>
      </div>
    );
  }
};

export default ShowAllSubmissions;
