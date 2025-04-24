const User = require('./userModel');
const Todo = require('./todoModel');
const Category = require('./categoryModel');

// Relasi User - Todo
User.hasMany(Todo);
Todo.belongsTo(User);

// Relasi User - Category
User.hasMany(Category);
Category.belongsTo(User);

// Relasi Category - Todo
Category.hasMany(Todo);
Todo.belongsTo(Category);

module.exports = {
    User,
    Todo,
    Category
};

