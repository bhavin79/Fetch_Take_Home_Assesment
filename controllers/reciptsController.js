const data = {};

export const processRecipt = async (req, res) => {
  return res.status(200).json({ message: "Testing Route for process" });
};

export const getPoints = async (req, res) => {
  return res
    .status(200)
    .json({ message: `Testing route for points with param ${req.params.id}` });
};
