const express = require('express');
const Todo = require('../model/todo');

const router = express.Router();

const items = 5;

router.get('/', async (req, res) => {
	let sort = req.query.sort;
	let pagination = req.query.page;

	const Todos = await Todo.find()
		.skip((pagination - 1) * items)
		.limit(items)
		.sort({ item: sort });
	res.render('todo', { Todos });
});

router.post('/', async (req, res) => {
	const newTodo = new Todo({
		item: req.body.todo
	});
	newTodo.save((err, suc) => {
		err ? res.send(err.message) : res.redirect('/');
	});
});

router.get('/delete/:id', async (req, res) => {
	await Todo.deleteOne({ _id: req.params.id });
	res.redirect('/');
});

router.get('/update/:id', async (req, res) => {
	let specificTodo = await Todo.findById({ _id: req.params.id });
	res.render('edit', { specificTodo });
});

router.post('/update/:id', async (req, res) => {
	await Todo.updateOne(
		{ _id: req.params.id },
		{ $set: { item: req.body.todo } }
	);
	res.redirect('/');
});

module.exports = router;
