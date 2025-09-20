import { v4 as uuidv4 } from "uuid";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.status(200).send(Object.values(req.context.models.messages));
});

router.get("/:messageId", (req, res) => {
  const { messageId } = req.params;

  if(!messageId){
    return res.status(400).json({
      error : "Id não informado"
    })
  }

  return res.status(200).send(req.context.models.messages[messageId]);
});

router.post("/", (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.status(201).send(message);
});

router.delete("/:messageId", (req, res) => {
  const { messageId } = req.params;

  if(!messageId){
    return res.status(400).json({
      error : "Id não informado"
    })
  }

  const { [messageId]: message, ...otherMessages } =
    req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.status(200).send(message);
});

export default router;
