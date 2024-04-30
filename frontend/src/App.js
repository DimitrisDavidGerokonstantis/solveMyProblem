import React, { Component } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import NewSubmission from "./pages/newSubmission.jsx";
import EditProblem from "./pages/editProblem.jsx";
import ShowResults from "./pages/showResults.jsx";
import ShowMySubmissions from "./pages/showMySubmissions.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import LoginPage from "./pages/loginPage";
import ShowAllSubmissions from "./pages/showAllSubmissions.jsx";

import "./index.css";
import { AuthContextProvider } from "./context/authContext.js";

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
  {
    path: "/submitproblem",
    element: (
      <React.Fragment>
        <Navbar />
        <NewSubmission />
      </React.Fragment>
    ),
  },
  {
    path: "/editproblem/:id",
    element: (
      <React.Fragment>
        <Navbar />
        <EditProblem />
      </React.Fragment>
    ),
  },
  {
    path: "/showresults/:id",
    element: (
      <React.Fragment>
        <Navbar />
        <ShowResults />
      </React.Fragment>
    ),
  },
  {
    path: "/submissions", //it seems to be the homepage for users
    element: (
      <React.Fragment>
        <Navbar />
        <ShowMySubmissions />
      </React.Fragment>
    ),
  },
  {
    path: "/allsubmissions",   //it seems to be the homepage for admins
    element: (
      <React.Fragment>
        <Navbar />
        <ShowAllSubmissions />
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
