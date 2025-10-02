import { Router } from "express";
import models from "../models";

const router = Router();
const taskModel = models.Task;

router.get('/', async (req, res) => {
    try {
        const users = await taskModel.findAll();
    } catch (error) {
        
    }
})