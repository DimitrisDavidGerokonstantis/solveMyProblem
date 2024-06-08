import axios from "axios";

export const isLoggedIn = async (req, res, next) => {
  try {
    console.log("COOKIES", req.cookies);
    // checks if a request is made by an authenticated (logged in) user
    const resp = await axios.post(
      "http://usersmanagement:5000/auth/authenticate",
      {
        request: req.cookies,
      }
    );
    if (!resp.data) {
      return res.status(401).json("Unauthorized : You need to log in!");
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.response.data);
  }
};

export const hasUsersPermissions = async (req, res, next) => {
  try {
    console.log("COOKIES", req.cookies);
    // checks if a request is made by an authenticated (logged in) user
    const resp = await axios.post(
      "http://usersmanagement:5000/auth/usersPermissions",
      {
        request: req.cookies,
      }
    );
    if (!resp.data) {
      return res
        .status(403)
        .json("Forbidden : You have not permissions to do this");
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.response.data);
  }
};

export const hasAdminsPermissions = async (req, res, next) => {
  try {
    console.log("COOKIES", req.cookies);
    // checks if a request is made by an authenticated (logged in) user
    const resp = await axios.post(
      "http://usersmanagement:5000/auth/adminsPermissions",
      {
        request: req.cookies,
      }
    );
    if (!resp.data) {
      return res
        .status(403)
        .json("Forbidden : You have not permissions to do this");
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.response.data);
  }
};

export const hasPermissionsToUpdate = async (req, res, next) => {
  try {
    console.log("REQUEST FOR HAS PERMISSIONS TO EDIT", req.cookies);
    // checks if a this user has permissions to edit this problem
    // i.e. he is the creator of this problem
    const resp = await axios.post(
      "http://usersmanagement:5000/auth/editPermissions",
      {
        request: req.cookies,
        problemToEdit: req.body.problemId,
      }
    );
    if (!resp.data) {
      return res
        .status(403)
        .json("Forbidden : You have no permissions to edit this problem");
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.response.data);
  }
};
