import React, { useEffect, useState } from "react";
import axios from "axios";
import { GraphCanvas } from "reagraph";
import File from "../images/file.png";
import { useLocation, useNavigate } from "react-router-dom";

const ShowResults = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const forwardedFromEmail = searchParams.get("forwarded") === "true";
  const forwardedDone = searchParams.get("forwardeddone") === "true";
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routesData, setRoutesData] = useState([]);
  const [Objective, setAnswerObjective] = useState("");
  const [MaxDistance, setAnswerMaxDistance] = useState("");
  const [nodes_graph, setNodes_Graph] = useState([]);
  const [edges, setEdges] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [notAllowedToSeeResults, setNotAllowedToSeeResults] = useState(false);

  const path = useLocation().pathname.split("/");
  const problemID = path[path.length - 1];

  if (forwardedDone) {
    console.log("forwardedDone");
    localStorage.setItem(
      "problemToShowResults",
      JSON.stringify({ problemID: null })
    );
  }

  const navigate = useNavigate();
  // const [answer, setAnswer] = useState([]);

  const [ques_id, setQuestionId] = useState(
    useLocation().pathname.split("/")[2]
  );

  console.log("QUESTION ID1", ques_id);

  function formatRoutes(jsonString) {
    // const data = JSON.parse(jsonString);
    // const { Objective, routes } = data;

    let result = `Objective: ${Objective}\n`;
    let maxDistance = `\nMaximum of the route distances: ${MaxDistance}\n`;

    routesData.forEach((route, index) => {
      const Route = route.Route;
      result += `\nRoute for vehicle ${index}:\n ${Route}\n`;
    });

    result += maxDistance;

    return result;
  }
  const jsonString = `{
    "Objective": 1158945,
    "routes": [
      {
        "Route": "0 ->  12 ->  7 ->  13 ->  2 ->  4 -> 0",
        "Distance of the route": "8361m"
      },
      {
        "Route": "0 ->  9 ->  14 -> 0",
        "Distance of the route": "11178m"
      },
      {
        "Route": "0 ->  19 ->  1 ->  6 ->  16 ->  18 ->  5 -> 0",
        "Distance of the route": "11165m"
      },
      {
        "Route": "0 ->  3 ->  11 ->  8 ->  15 ->  17 ->  10 ->  20 ->  21 ->  22 ->  23 ->  24 -> 0",
        "Distance of the route": "15000m"
      },
      {
        "Route": "0 ->  25 ->  26 ->  27 ->  28 ->  29 ->  30 ->  31 ->  32 ->  33 ->  34 -> 0",
        "Distance of the route": "18000m"
      }
    ]
  }`;

  const results_file = formatRoutes(jsonString);
  const render_results_file = results_file.split("\n");

  useEffect(() => {
    const fetchMyAnswer = async () => {
      console.log("QUESTION ID2", ques_id);
      try {
        const res = await axios.get(
          `http://localhost:8080/api/getResults?id=${ques_id}`
        );
        console.log("STATUS", res.status);
        setNotAllowedToSeeResults(false);
        setRoutesData(res.data[0].answer.Routes);
        setAnswerObjective(res.data[0].answer.Objective);
        setAnswerMaxDistance(res.data[0].answer.MaximumDistance);
        console.log("Fetched Answer: ", res.data[0].answer.Routes);
      } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 403) {
          setNotAllowedToSeeResults(true);
        }
      }
    };

    fetchMyAnswer();
  }, [ques_id]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/auth/getToken`);
        setAccessToken(res.data.token);
        console.log("TOKEN", res.data);
        if (res.data.token) {
          setUserId(JSON.parse(localStorage.getItem("user")).id);
        } else setAccessToken(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedRoute !== null && routesData.length > 0) {
      const selectedRouteData = routesData[selectedRoute];
      const routeDescription = selectedRouteData.Route;

      const nodes = routeDescription.split(" -> ").map((node) => node.trim());
      let help1 = [];
      let help2 = [];
      for (let i = 0; i < nodes.length - 1; i++) {
        help1.push({
          id: nodes[i],
          label: nodes[i],
        });
      }
      setNodes_Graph(help1);

      for (let i = 0; i < nodes.length - 1; i++) {
        help2.push({
          id: i,
          source: nodes[i],
          target: nodes[i + 1],
          label: "Edge" + i,
        });
      }
      setEdges(help2);
    }
    fetchAccessToken();
  }, [selectedRoute, routesData, notAllowedToSeeResults]);

  const handleRouteSelection = (routeIndex) => {
    setSelectedRoute(routeIndex);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedRoute(null);
  };

  const handleFileClick = () => {
    setIsFileOpen(true);
  };

  const FileClose = () => {
    setIsFileOpen(false);
  };

  const DownloadFile = () => {
    const link = document.createElement("a");
    const content = results_file;
    const file = new Blob([content], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = "sample.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  if (accessToken) {
    if (notAllowedToSeeResults) {
      return (
        <div class="bg-orange-50 bg-cover w-screen h-screen flex justify-center">
          <h3 className="mt-40 text-4xl font-semibold text-center">
            You do not have the permissions to see the results for this problem!
          </h3>
        </div>
      );
    } else {
      return (
        <div className="bg-orange-50 bg-cover w-screen flex items-center justify-center overflow-scroll">
          <div class="bg-orange-50 bg-cover w-1/6 h-screen flex-col items-center justify-center overflow-scroll"></div>
          <div class="bg-orange-50 bg-cover w-4/6 h-screen flex-col items-center justify-center overflow-scroll">
            <div className="flex flex-col items-center justify-center parthome w-full shadow-lg ring-orange-200">
              <div class="gap-5 mt-10 flex items-center">
                <h3 class="text-xl font-bold text-orange-800">
                  The entire answer to the problem is in this file
                </h3>
                <button onClick={handleFileClick}>
                  <img src={File} alt="" class="w-9 h-9" />
                </button>
              </div>
              <br></br>
              <br></br>
              <h2 class="mt-10 mb-6 text-2xl font-bold text-orange-800">
                Information per vehicle{" "}
              </h2>
              <br></br>
              <div className="money bg-orange-100 w-full">
                <table>
                  <thead>
                    <tr>
                      <th>Vehicle Number</th>
                      <th>Distance of the route</th>
                      <th>See route</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routesData.map((route, index) => (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>XXXXXX</td>
                        <td>
                          <button
                            className="bg-orange-900 text-white rounded-md px-4 py-2 hover:bg-orange-700 transition"
                            onClick={() => handleRouteSelection(index)}
                          >
                            Click to see route
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Modal */}
              {showModal && selectedRoute !== null && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <div className="relative bg-white shadow-xl rounded-md max-w-screen-lg mx-auto">
                    <div className="flex justify-end p-2">
                      <div className="mt-6 mb-3 text-lg font-bold text-orange-800">
                        Route for Vehicle {selectedRoute}
                      </div>
                      <button
                        onClick={closeModal}
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
                    <div className="relative shadow-xl rounded-md bg-white w-screen max-w-xl min-h-96">
                      <GraphCanvas nodes={nodes_graph} edges={edges} />
                    </div>
                  </div>
                </div>
              )}

              {/* File */}
              {isFileOpen && (
                <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
                  <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-3xl">
                    {" "}
                    <div className="flex justify-end p-2">
                      <button
                        class="middle none center rounded-lg bg-orange-700 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:bg-orange-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                        onClick={DownloadFile}
                      >
                        Download
                      </button>
                      <button
                        onClick={FileClose}
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
                    <div className="py-3 px-4 flex items-center justify-center bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
                      <div className="w-full lg:w-9/12 bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
                        {" "}
                        <div id="header-buttons" className="py-3 px-4 flex">
                          <div className="rounded-full w-3 h-3 bg-red-500 mr-2"></div>
                          <div className="rounded-full w-3 h-3 bg-yellow-500 mr-2"></div>
                          <div className="rounded-full w-3 h-3 bg-green-500"></div>
                        </div>
                        <div
                          id="code-area"
                          className="py-4 px-4 mt-1 text-white text-xl"
                        >
                          {render_results_file.map((line, index) => (
                            <>
                              <div key={index}>{line}</div>
                              {line.startsWith("Distance") && <br></br>}
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div class="bg-orange-50 bg-cover w-1/6 h-screen flex-col items-center justify-center overflow-scroll"></div>
        </div>
      );
    }
  } else {
    if (!forwardedFromEmail) {
      return (
        <div class="bg-orange-50 bg-cover w-screen h-screen flex justify-center">
          <h3 className="mt-40 text-4xl font-semibold">
            You have to login with a valid account!
          </h3>
        </div>
      );
    } else {
      if (accessToken === false) {
        console.log("accessTokFalse");
        navigate(`/login?showresults=${problemID}`);
      }
    }
  }
};

export default ShowResults;
