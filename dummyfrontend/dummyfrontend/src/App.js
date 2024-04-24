import React, { Component } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DummyPage from "./pages/dummyPage.jsx";


// import "./style.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <DummyPage />
    ),
  }
]);

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="container">
          {" "}
          <RouterProvider router={router} />
        </div>
      </div>
    );
  }
}

export default App;