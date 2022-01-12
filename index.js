const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/todos", async (req, res) => {
	try {
		const allTodos = await pool.query("SELECT * FROM todo");
		res.json(allTodos.rows);
	} catch (error) {
		console.log(error.message);
	}
});

app.get("/todos/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [
			id,
		]);
		res.json(todo.rows[0]);
	} catch (error) {
		console.log(error.message);
	}
});

app.post("/todos", async (req, res) => {
	try {
		const { description } = req.body;
		if (description) {
			const newTodo = await pool.query(
				"INSERT INTO todo (description) VALUES ($1) RETURNING *",
				[description]
			);
			res.json({
				message: "Added data successfully",
				data: newTodo.rows[0],
			});
		} else {
			res.json({ error: "Couldn't add the data entered" });
		}
	} catch (error) {
		console.log(error.message);
		res.json({ error: "Couldn't add the data entered" });
	}
});

app.put("/todos/:id", async (req, res) => {
	const id = req.params.id;
	const { description } = req.body;
	try {
		const updateTodo = await pool.query(
			"UPDATE todo SET description=$1 WHERE todo_id=$2",
			[description, id]
		);
		res.json({ message: "Data updated sucessfully" });
	} catch (error) {
		console.log(error.message);
	}
});

app.delete("/todos/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const deleteTodo = await pool.query(
			"DELETE FROM todo WHERE todo_id=$1",
			[id]
		);
		res.json({ message: "Data deleted successfully" });
	} catch (error) {
		console.log(error.message);
	}
});

app.listen(4000, () => {
	console.log("Server started");
});
