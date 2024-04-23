import axios from "axios";

export const callDummyController = async (req, res) => {
  const headers = {
    'Content-Type': 'application/json', 
  };
  try {
    console.log('HELLOOOOOOO')
    const result = await axios.get(
      `http://submitproblem:5000/api/submitProblem/dummy`, {headers:headers}
    );
    console.log('HELLOOOOOOO2', result)
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({ message: "Data received successfully" });
};