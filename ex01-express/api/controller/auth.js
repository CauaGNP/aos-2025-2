import jwt from "jsonwebtoken";
import models from "../models/index.js";
import bcrypt from "bcrypt";
import "dotenv/config";

const users = models.User;

const auth = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({where : { email }});   
        
        if(!user){
            return res.status(401).send({ error : "Usuário não cadastrado"});
        }

        const verifyPassword = await bcrypt.compare(password, user.password);
        if(!verifyPassword){
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