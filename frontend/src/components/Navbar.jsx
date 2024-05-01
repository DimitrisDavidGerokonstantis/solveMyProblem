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
  const [username, setUsername] = useState(currentUser?.username);
  const [nameChanged, setNameChanged] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [usernameInButton, setUsernameInButton] = useState(
    currentUser?.username
  );

  console.log(username, currentUser);

  useEffect(() => {
    setUsernameInButton(username || currentUser?.username);
    if (!username) {
      setUsername(currentUser?.username);
    }
  }, [nameChanged, currentUser]);

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
          }
        );
        console.log(res.data);
        let user = JSON.parse(localStorage.getItem("user"));
        user.username = username;
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.log(error);
      }
    }
    document.getElementById("my_modal_1").close();
    setNameChanged(!nameChanged);
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
                  <div className="mb-10 w-full shadow-lg p-4 rounded-xl bg-orange-200 flex-col items-center justify-center text-center">
                    <input
                      onChange={handleUsername}
                      type="text"
                      placeholder="Username"
                      value={username}
                      className="input text-center py-2 px-4 mb-2 input-bordered w-full max-w-xs rounded-full bg-orange-50"
                    />
                    <form method="dialog">
                      <button
                        onClick={handleUpdate}
                        className="px-4 py-2 inline-flex items-center relative px-2 border bg-green-200 border-green-900 rounded-xl hover:bg-green-400"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                  <div className="mb-10 w-full shadow-lg p-4 rounded-xl bg-orange-200 flex-col items-center justify-center text-center">
                    <div className="flex mt-2 justify-center shadow-xl rounded-lg bg-orange-300">
                      <p className="mb-2 mt-2 py-4 text-xl ">
                        Your credits : 400
                      </p>
                    </div>
                    <p className="py-4 mt-4 text-lg ">Buy credits</p>

                    <input
                      type="text"
                      placeholder="credits to buy"
                      className="input text-center py-2 px-4 mb-2 input-bordered w-full max-w-xs rounded-full bg-orange-50"
                    />
                    <form method="dialog">
                      <button className="px-4 py-2 inline-flex items-center relative px-2 border bg-green-200 border-green-900 rounded-xl hover:bg-green-400">
                        Buy
                      </button>
                    </form>
                  </div>
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
