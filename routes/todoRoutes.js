import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  // get all todos
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

router.post("/todo", async (req, res) => {
  // create a todo
  const { title } = req.body;
  const todo = await prisma.todo.create({
    data: { title, completed: false },
  });
  res.json(todo);
});

router.put("/todo/:id", async (req, res) => {
  // update a todo
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = await prisma.todo.update({
    where: { id: parseInt(id) },
    data: { title, completed },
  });
  res.json(todo);
});

router.delete("/todo/:id", async (req, res) => {
  // delete a todo
  const { id } = req.params;
  await prisma.todo.delete({
    where: { id: parseInt(id) },
  });
  res.json({
    message: "todo deleted successfully",
  });
});

export default router;
