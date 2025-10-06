import { Router } from "express";
import auth from "../controller/auth";

const router = Router();

router.post("/", auth);

export default router;