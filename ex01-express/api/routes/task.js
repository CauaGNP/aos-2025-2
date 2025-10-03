import { Router } from "express";
import models from "../models/index.js";

const router = Router();
const taskModel = models.Task;

router.get('/', async (req, res) => {
    try {
        const tasks = await taskModel.findAll();

        return res.status(200).send({
            message : "Tarefa encontrada",
            data : tasks
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
        error : "Erro interno do servidor."
        }); 
    }
})

router.get("/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await taskModel.findByPk(taskId);

        if(!task){
            return res.status(404).send({
                error : "Tarefa não encontrada",
            })
        }

        return res.status(200).send({
            message : "Tarefa encontrada",
            data : task
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
        error : "Erro interno do servidor."
        }); 
    }
})

router.post("/", async (req, res) => {
    try {
        const { description, finish } = req.body;

        if(!description){
            return res.status(400).send({
                error : "Não foi possível cirar a tarefa, por favor inserir descrição"
            });
        }

        const taskData = {
            description,
            finish
        }

        const newTask = await taskModel.create(taskData);

        return res.status(201).send({
        message : "Tarefa criada",
        data : newTask
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
        error : "Erro interno do servidor."
        }); 
    }
})

router.put("/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        const taskExist = await taskModel.findByPk(taskId);

        if(!taskExist){
            return res.status(404).send({
                error : "Tarefa não encontrada",
            })
        }

        const { description, finish } = req.body;

        const taskData = {
        description,
        finish
        }
        
        const taskUpdated = await taskModel.update(taskData, { where : {
            id : taskId
        }});

        return res.status(200).send({
            message : "Tarefa atualizada!!",
            data : taskData
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
        error : "Erro interno do servidor."
        }); 
    }
})

router.delete("/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        const taskExist = await taskModel.findByPk(taskId);

        if(!taskExist){
            return res.status(404).send({
                error : "Tarefa não encontrada",
            })
        }

        await taskModel.destroy({
            where : {
                id : taskId,
            }
        })

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send({
        error : "Erro interno do servidor."
        }); 
    }
})

export default router;