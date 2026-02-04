import { Router } from "express";
import { postTransfer } from "../controllers/transfer.controller";
import { validateBody } from "../middlewares/validate";
import { transferSchema } from "../validators/transfer.validator";

const router = Router();

router.post("/transfer", validateBody(transferSchema), postTransfer);

export default router;
