import { Router } from "express";
import transferRoutes from "./transfer";

const router = Router();
router.use(transferRoutes);

export default router;
