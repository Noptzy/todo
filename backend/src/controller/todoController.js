const Todo = require("../models/todoModel.js");

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json({
      success: true,
      message:
        "Data Todo berhasil didapatkan Hmphh!!!!, Pakai yang bener ya!! Watashi wa Siranai HMPHHHH!!!!",
      data: todos,
      code: 200,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Errr Watashi Pusinggg!!!!", error: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const todo = await Todo.create({
      title,
      description,
      due_date,
      userId: req.user.id,
    });
    res.status(201).json({
      success: true,
      message: "Data Todo Kamu berhasil ditambahkan Hmphh!!!!",
      data: todo,
      code: 201,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Errr Watashi Pusinggg!!!!", error: error.message });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "B--BAKAAA!!! Todonya ga ditemukan, Isi dulu lah Ahooo!!!",
        code: 404,
      });
    }
    res.status(200).json({
      success: true,
      message: "Data Todo Kamu berhasil didapatkan Hmphh!!!!",
      data: todo,
      code: 200,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Errr Watashi Pusinggg!!!!", error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "B--BAKAAA!!! Todonya ga ditemukan, Isi dulu lah Ahooo!!!",
        code: 404,
      });
    }

    await todo.update(req.body);
    res.status(201).json({
      success: true,
      message: "Data Todo Kamu berhasil diupdate Hmphh!!!!",
      data: todo,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Errr Watashi Pusinggg!!!!", error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "B--BAKAAA!!! Todonya ga ditemukan, Isi dulu lah Ahooo!!!",
        code: 404,
      });
    }

    await todo.destroy();
    res.status(200).json({
      success: true,
      message: "Todo berhasil dihapus Hmphh!!!",
      code: 200,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Errr Watashi Pusinggg!!!!", error: error.message });
  }
};
