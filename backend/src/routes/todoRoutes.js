const express = require("express");
const router = express.Router();
const todoController = require("../controller/todoController.js");
const authMiddlware = require("../middleware/auth.js");

router.get('/', authMiddlware, todoController.getAllTodos);
router.get('/:id', authMiddlware, todoController.getTodoById);
router.post('/', authMiddlware, todoController.createTodo);
router.put('/:id', authMiddlware, todoController.updateTodo);
router.delete('/:id', authMiddlware, todoController.deleteTodo);

module.exports = router;