import { Router } from "express";

const router = Router();

router.route("/process").post((req, res) => {
  return res.status(200).json({ message: "Testing Route for process" });
});

router.route("/:id/points").get((req, res) => {
  return res
    .status(200)
    .json({ message: `Testing route for points with param ${req.params.id}` });
});

export default router;
