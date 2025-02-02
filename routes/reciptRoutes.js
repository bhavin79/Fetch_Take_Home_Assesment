import { Router } from "express";
import { getPoints, processRecipt } from "../controllers/reciptsController.js";

const router = Router();

router.route("/process").post(processRecipt);

router.route("/:id/points").get(getPoints);

export default router;
