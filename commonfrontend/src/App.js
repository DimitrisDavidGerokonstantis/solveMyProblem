import React, { Component } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "./pages/loginPage";
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import RegisterPage from "./pages/registerPage.jsx"


import "./index.css";


const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <React.Fragment>
        <Navbar />
        <LoginPage />
      </React.Fragment>
    ),
  },
   {
    path: "/register",
    element: (
      <React.Fragment>
        <Navbar />
        <RegisterPage />
      </React.Fragment>
    ),
  },
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
