//Loading Spinner from : https://contactmentor.com/how-to-add-loading-spinner-react-js/
import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  var { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null);
  const [credits, setCredits] = useState("");
  const [creditsToBuy, setCreditsToBuy] = useState(0);
  const [username, setUsername] = useState(null);
  const [nameChanged, setNameChanged] = useState(false);
  const [creditsChanged, setCreditsChanged] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [usernameInButton, setUsernameInButton] = useState(
    currentUser?.username
  );

  console.log(username, currentUser);

  useEffect(() => {
    const fetchCredits = async (userid) => {
      try {
        const res = await axios.get(
          `http://localhost:8080/auth/getCredits/${userid}`
        );
        console.log(res.data);
        setCredits(res.data.credits);
      } catch (error) {
        console.log(error);
      }
    };

    setUsernameInButton(username);

    // if (!username) {
    //   setUsername(currentUser?.username);
    // }
    if (currentUser && role === "user") {
      fetchCredits(userID);
      //setUserID(currentUser.id);
    }
  }, [nameChanged, currentUser, creditsChanged]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/auth/getToken`);
        setAccessToken(res.data.token);
        setRole(res.data.role);
        setUsername(res.data.username);
        setUsernameInButton(res.data.username);
        console.log("TOKEN", res.data);
        if (res.data.token) {
          setUserID(res.data.userid);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccessToken();
  }, [currentUser]);

  const handleUsername = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length > 24) {
      setUsernameError("Length is <25");
    } else {
      setUsernameError("");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (usernameError === "") {
      try {
        const res = await axios.put(
          "http://localhost:8080/auth/updateUsername",
          {
            oldName: usernameInButton,
            username: username,
            userID: userID,
          }
        );

        setUsernameError("");
        console.log(res.data);
        let user = JSON.parse(localStorage.getItem("user"));
        user.username = username;
        localStorage.setItem("user", JSON.stringify(user));
        document.getElementById("my_modal_1").close();
        setNameChanged(!nameChanged);
      } catch (error) {
        console.log("ERROR", error);
        console.log("ERROR", error.response.data);
        setUsernameError(error.response.data);
      }
    }
  };

  const handleCredits = (e) => {
    setCreditsToBuy(e.target.value);
  };

  const handleCreditsBuy = async (e) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/auth/buyCredits/${userID}`,
        {
          creditsToBuy: creditsToBuy,
        }
      );
      console.log(res.data);
      setCreditsChanged(!creditsChanged);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="w-screen bg-orange-200 text-orange-900">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center justify-start">
          <Link
            className="text-xl font-bold uppercase tracking-widest"
            to="/login"
          >
            SOLVIO
          </Link>
        </div>

        <div className="flex justify-end items-center relative">
          <div className="block">
            <div className="inline relative">
              {currentUser && (
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                  className="px-4 py-2 inline-flex items-center relative px-2 border bg-red-200 border-orange-900 rounded-full hover:shadow-lg"
                >
                  {usernameInButton}
                </button>
              )}
              <dialog
                id="my_modal_1"
                className="modal p-8 rounded-lg bg-orange-100"
              >
                <div className="modal-box px-4 ">
                  <h3 className="font-bold text-lg">
                    Hello {usernameInButton}!
                  </h3>
                  <p className="py-4">
                    You can update your username and buy credits!
                  </p>
                  <div className="mb-2 w-full shadow-lg p-4 rounded-xl bg-orange-200 flex-col items-center justify-center text-center">
                    <input
                      onChange={handleUsername}
                      type="text"
                      placeholder="Username"
                      value={username}
                      className="input text-center py-2 px-4 mb-2 input-bordered w-full max-w-xs rounded-full bg-orange-50"
                    />
                    <form method="dialog">
                      <p class="mt-2 mb-2 flex flex-col text-center text-red-500 ">
                        {usernameError}
                      </p>
                      <button
                        onClick={handleUpdate}
                        className="px-4 py-2 inline-flex items-center relative px-2 border bg-green-200 border-green-900 rounded-xl hover:bg-green-400"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                  {role === "user" && (
                    <div className="mb-10 w-full shadow-lg p-4 rounded-xl bg-orange-200 flex-col items-center justify-center text-center">
                      <div className="flex mt-2 justify-center shadow-xl rounded-lg bg-orange-300">
                        <p className="mb-2 mt-2 py-4 text-xl ">
                          Your credits : {credits}
                        </p>
                      </div>
                      <p className="py-4 mt-4 text-lg ">Buy credits</p>

                      <input
                        type="text"
                        placeholder="credits to buy"
                        onChange={handleCredits}
                        className="input text-center py-2 px-4 mb-2 input-bordered w-full max-w-xs rounded-full bg-orange-50"
                      />
                      <form method="dialog">
                        <button
                          onClick={handleCreditsBuy}
                          className="px-4 py-2 inline-flex items-center relative px-2 border bg-green-200 border-green-900 rounded-xl hover:bg-green-400"
                        >
                          Buy
                        </button>
                      </form>
                    </div>
                  )}
                  <div className=" modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="px-4 py-2 inline-flex items-center relative px-2 border bg-red-200 border-orange-900 rounded-full hover:shadow-lg btn">
                        Close
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>

              {!currentUser ? (
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  type="button"
                  className="ml-10 px-4 py-2 inline-flex items-center relative px-2 border border-orange-900 rounded-full hover:shadow-lg"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  type="button"
                  className="ml-10 px-4 py-2 inline-flex items-center relative px-2 border border-orange-900 rounded-full hover:shadow-lg"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
