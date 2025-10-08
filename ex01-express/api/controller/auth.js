import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import models from "../models/index.js";

const users = models.User;

const auth = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findAll({where : { email }});   
        
        if(!user){
            return res.status(401).send({ error : "Usuário não cadastrado"});
        }

        const hashPassword = await bcrypt.hash(password, 10);
        if(user.password != hashPassword){
            return res.status(401).send({
                error : "Senha errada"
            })
        }
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: '1h',
        });

        res.status(200).send({
            message: "logado com sucesso",
            token
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error : "Error no servidor"
        })
    }
}

export default auth;