import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const { users } = req.context.models;

  return res.status(200).send({
    "data" : users,
  });
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params

  if(!userId){
    return res.status(400).json({
      error: "Id não informado"
    })
  }

  return res.status(200).send(req.context.models.users[userId]);
});

router.post("/", (req, res) => {
  return res.status(201).send("POST HTTP method on user resource");
});

router.put("/:userId", (req, res) => {
  const { userId } = req.params

  if(!userId){
    return res.status(400).json({
      error: "Id não informado"
    })
  }

  return res.status(200).send(`PUT HTTP method on user/${userId} resource`);
});

router.delete("/:userId", (req, res) => {
  const { userId } = req.params

  if(!userId){
    return res.status(400).json({
      error: "Id não informado"
    })
  }

  return res.status(200).send(`DELETE HTTP method on user/${userId} resource`);
});

export default router;
