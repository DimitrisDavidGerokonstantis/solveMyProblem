
export const dummyController = (req, res) => {
  console.log("HELLO from dummy controller!!!");
  return res.status(200).json({ message: "Data received successfully" });
};