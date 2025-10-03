import { Router } from "express";
import models from "../models/index.js";

const router = Router();
const users = models.User;

router.get("/", async (req, res) => {
  try {
    const allUsers = await users.findAll();

    return res.status(200).send({
      data : allUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error : "Erro interno do servidor."
    }); 
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const getUser = await users.findByPk(userId);

    if(!getUser){
      return res.status(404).send({
        error: "Usuário não encointrado",
      });
    }
    return res.status(200).send({
      message : "Usuário encontrado",
      data : getUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error : "Erro interno do servidor."
    }); 
  }
});

router.post("/", async (req, res) => {
  try {
    const { username,email } = req.body;

    if(!username || !email){
      return res.status(400).send({
        error : "Preencha os campos obrigatórios!!"
      })
    }
    
    const newUserData = {
      email,
      username 
    }

    const newUser = await users.create(newUserData);
    
    return res.status(201).send({
      message : "Usário criado",
      data : newUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error : "Erro interno do servidor."
    }); 
  }
  
});

router.put("/:userId", async(req, res) => {
  try {
    const { userId } = req.params
    const { username,email } = req.body;

    const userExist = await users.findByPk(userId);

    if(!userExist){
      return res.status(404).send({
        error: "Usuário não encontrado!!"
      })
    }

    const newUserData = {
      email : email,
      username: username 
    }

    await users.update(newUserData, {where: {
      id : userId
    }})

    return res.status(200).send({
      message : "Usuário atualizado",
      data : newUserData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error : "Erro interno do servidor."
    }); 
  }
  
});

router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userExist = await users.findByPk(userId);

    if(!userExist){
      return res.status(404).send({
        error: "Usuário não encontrado!!"
      })
    }

    await users.destroy({
      where:{
        id : userId,
      }
    })

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error : "Erro interno do servidor."
    }); 
  }
  
});

export default router;
