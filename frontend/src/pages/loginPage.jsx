import LoginPhoto from "../images/loginPhoto.png";
import GoogleLogo from "../images/googleLogo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
const LoginPage = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  let isGoogleLogin = searchParams.get("google") === "true";
  const googleToken = searchParams.get("token");
  console.log("Is Google login:", isGoogleLogin);
  const { login, googleLogin } = useContext(AuthContext);
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const problemID = searchParams.get("showresults");
  if (problemID) {
    localStorage.setItem(
      "problemToShowResults",
      JSON.stringify({ problemID: problemID })
    );
  }

  const navigate = useNavigate();

  const navig = (url) => {
    window.location.href = url;
  };

  async function auth() {
    const response = await fetch(
      "http://127.0.0.1:5001/googleAuth/googleRequest",
      {
        method: "post",
      }
    );
    const data = await response.json();
    navig(data.url);
  }

  const handleUsername = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length > 24) {
      setUsernameError("Length is <25");
    } else {
      setUsernameError("");
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length === 0 || password.length === 0) {
      setLoginError("Missing values!");
    } else if (usernameError !== "") {
      setLoginError("Check for errors!");
    } else {
      setLoginError("");
      try {
        const result = await login({
          username: username,
          password: password,
        });
        // if (result === "user") navigate("/submissions");
        // else if (result === "admin") navigate("/allsubmissions");
        fetchAccessToken();
      } catch (error) {
        console.log(error.response.data);
        setLoginError(error.response.data);
      }
    }
  };
  const fetchAccessToken = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/auth/getToken`);
      if (res.data.token) {
        setAccessToken(res.data.token);
        setRole(res.data.role);
        console.log("TOKEN", res.data);
        setUserId(JSON.parse(localStorage.getItem("user")).id);
        let probID = JSON.parse(localStorage.getItem("problemToShowResults"));
        console.log("probID", probID, typeof probID);
        if (probID.problemID !== null) {
          console.log("probID2", probID, typeof probID);
          navigate(`/showresults/${probID.problemID}?forwardeddone=true`);
        } else {
          if (res.data.role === "user") {
            navigate("/submissions");
          }
          if (res.data.role === "admin") {
            navigate("/allsubmissions");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const executeGoogleLoginOrFetchToken = async () => {
      try {
        if (isGoogleLogin) {
          isGoogleLogin = false;
          console.log("GOOGLE TOKEN", googleToken);
          const googleUser = await googleLogin(googleToken); // Wait for googleLogin to complete
          console.log("GU", googleUser);

          // if (googleUser.role === "user") {
          //   navigate("/submissions");
          // }
          // if (googleUser.role === "admin") {
          //   navigate("/allsubmissions");
          // }
        }
        fetchAccessToken();
      } catch (error) {
        console.log(error);
      }
    };

    executeGoogleLoginOrFetchToken();
  }, []);

  return (
    <div class="relative flex h-screen w-screen">
      <div class="h-screen w-2/5 bg-black-900">
        <img src={LoginPhoto} class="h-full w-full" />
      </div>
      <div class="h-screen w-3/5 bg-orange-900">
        <div class="mx-auto flex h-screen w-2/3 flex-col justify-center text-white xl:w-1/3">
          <div class="flex justify-center">
            {problemID ? (
              <p class="mb-4 text-3xl text-yellow-400 text-center">
                Login so as to see your results
              </p>
            ) : (
              <p class="text-3xl text-orange-100">Login</p>
            )}
          </div>
          <div class="mt-10">
            <form>
              <div class="flex-col">
                <label class="mb-3 block font-extrabold" for="username">
                  Username
                </label>
                <input
                  onChange={handleUsername}
                  type="username"
                  id="username"
                  class="inline-block w-full rounded-full bg-orange-50 p-2.5 leading-none text-black placeholder-yellow-900 shadow placeholder:opacity-30"
                  placeholder="username"
                />
                <p class="mt-1 mb-3 flex flex-col text-center text-md text-red-500 ">
                  {usernameError}
                </p>
              </div>
              <div class="mt-5">
                <label class="mb-3 block font-extrabold" for="password">
                  Password
                </label>
                <input
                  onChange={handlePassword}
                  type="password"
                  id="password"
                  class="inline-block w-full rounded-full bg-orange-50 p-2.5 leading-none text-black placeholder-yellow-900 shadow placeholder:opacity-30"
                  placeholder="password"
                />
              </div>
              <p class="text-sm mt-3">
                You don't have an account yet ?{" "}
                <Link class="text-blue-400 underline" to="/register">
                  Register
                </Link>
              </p>
              <div class="my-10">
                <button
                  onClick={handleSubmit}
                  class="w-full rounded-full bg-orange-700 p-5 hover:bg-orange-600"
                >
                  Login
                </button>
                <p class="mt-2 mb-10 flex flex-col text-center text-md text-red-500 ">
                  {loginError}
                </p>
              </div>
            </form>
          </div>
          <div>
            <fieldset class="border-t border-solid border-orange-100">
              <legend class="mx-auto px-2 text-center text-sm text-orange-100">
                Or sign in with Google
              </legend>
            </fieldset>
          </div>
          <div class="my-10">
            <button
              onClick={() => auth()}
              class="flex w-full justify-center rounded-3xl border-none bg-white p-1 text-black hover:bg-orange-100 sm:p-3"
            >
              <img src={GoogleLogo} class="mr-4 w-6 object-fill" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
