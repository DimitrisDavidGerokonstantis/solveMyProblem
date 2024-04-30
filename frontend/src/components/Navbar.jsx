//Loading Spinner from : https://contactmentor.com/how-to-add-loading-spinner-react-js/
import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
                  className="px-4 py-2 inline-flex items-center relative px-2 border bg-red-200 border-orange-900 rounded-full hover:shadow-lg"
                >
                  {currentUser.username}
                </button>
              )}
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
