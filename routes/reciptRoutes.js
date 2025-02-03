import { Router } from "express";
import { getPoints, processReceipt } from "../controllers/reciptsController.js";

const router = Router();

router.route("/process").post(processReceipt);

router.route("/:id/points").get(getPoints);

export default router;
