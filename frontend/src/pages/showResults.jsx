import React, { useEffect, useState, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsNetworkgraph from "highcharts/modules/networkgraph";
import File from "../images/file.png";

// Initialize the networkgraph module
HighchartsNetworkgraph(Highcharts);

const ShowResults = () => {
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routesData, setRoutesData] = useState([]);
  const chartContainerRef = useRef(null); // Ref for the chart container

  function formatRoutes(jsonString) {
    const data = JSON.parse(jsonString);
    const { Objective, routes } = data;

    let result = `Objective: ${Objective}\n`;

    routes.forEach((route, index) => {
      const { Route, "Distance of the route": distance } = route;
      result += `\nRoute for vehicle ${index}:\n ${Route}\nDistance of the route: ${distance}\n`;
    });

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
    // Load routes data

    // Parse the JSON string and set routes data
    const jsonData = JSON.parse(jsonString);
    setRoutesData(jsonData.routes);
  }, []);

  useEffect(() => {
    // Create the Highcharts chart
    if (isModalOpen && selectedRoute !== null && chartContainerRef.current) {
      const selectedRouteData = routesData[selectedRoute];
      const routeDescription = selectedRouteData["Route"];

      // Parse routeDescription to extract nodes
      const nodes = routeDescription.split(" -> ").map((node) => node.trim());

      // Create edges data based on nodes
      const edges = [];
      for (let i = 0; i < nodes.length - 1; i++) {
        edges.push({
          from: nodes[i],
          to: nodes[i + 1],
          color: i === 0 ? "red" : undefined,
        });
      }
      edges.push({
        from: nodes[nodes.length - 1],
        to: nodes[0],
        color: undefined,
      }); // Connect last node to the first node

      // Create the Highcharts chart with edges data
      Highcharts.chart(chartContainerRef.current, {
        chart: {
          type: "networkgraph",
          marginTop: 80,
        },
        title: {
          text: `Route for Vehicle ${selectedRoute}`,
        },
        plotOptions: {
          networkgraph: {
            keys: ["from", "to"],
            layoutAlgorithm: {
              linkLength: 30,
            },
          },
        },
        series: [
          {
            marker: {
              radius: 30,
            },
            dataLabels: {
              enabled: true,
              linkFormat: "",
              allowOverlap: true,
              style: {
                fontSize: "14px",
              },
              textAlign: "center",
              verticalAlign: "middle",
            },
            data: edges,
          },
        ],
      });
    }
  }, [isModalOpen, selectedRoute, routesData, chartContainerRef]);

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

  const openModal = (routeIndex) => {
    setIsModalOpen(true);
    setSelectedRoute(routeIndex);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoute(null);
  };

  return (
    <div className="parthome">
      <div class="flex items-center">
        <h3 class="text-xl font-bold text-blue-500">
          The entire answer to the problem is in this file:
        </h3>
        <button onClick={handleFileClick}>
          <img src={File} alt="" class="w-9 h-9" />
        </button>
      </div>
      <br></br>
      <br></br>
      <h2 class="text-2xl font-bold text-blue-500">
        Information per vehicle :{" "}
      </h2>
      <br></br>
      <div className="money">
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
                <td>{route["Distance of the route"]}</td>
                <td>
                  <button
                    className="bg-rose-500 text-white rounded-md px-4 py-2 hover:bg-rose-700 transition"
                    onClick={() => openModal(index)}
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
      {isModalOpen && selectedRoute !== null && (
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
            {/* Container for Highcharts graph */}
            <div
              ref={chartContainerRef}
              id="modal-graph"
              className="p-6 pt-0 text-center"
            ></div>
            <div class="text-center">
              The path until the first stop is specified with{" "}
              <span class="text-red-500">red</span> color
            </div>
          </div>
        </div>
      )}

      {/* File */}
      {/* File */}
      {isFileOpen && (
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
          <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-3xl">
            {" "}
            {/* Adjusted max-width */}
            <div className="flex justify-end p-2">
              <button
                class="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
                {/* Adjusted width */}
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
  );
};

export default ShowResults;
