import axios from "axios";

export const callDummyController = async (req, res) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/submitProblem/dummy`
    );
    console.log(res.data)
  } catch (error) {
    console.log(error);
  }
  return {"message":"everything is OK"}
};