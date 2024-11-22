import { Request, Response } from "express";

const todos = [
    { id: 1, name: 'Buy milk', completedAt: new Date() },
    { id: 2, name: 'Buy bread', completedAt: null },
    { id: 3, name: 'Buy butter', completedAt: new Date() }
]

export class TodosController {
    //* DI
    constructor() {
        console.log('TodosController');
    }

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos)
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if(isNaN(id)) return res.status(400).json({ error: 'id must be a number' });

        const todo = todos.find(todo => todo.id === id);

        (todo) 
            ? res.json(todo) 
            : res.status(404).json({ error: `TODO with id ${id} not found` })
    }

    public createTodo = (req: Request, res: Response) => {
        const { name } = req.body;

        if(!name) return res.status(400).json({ error: 'Name is required' });

        const newTodo = {
            id: todos.length + 1,
            name,
            completedAt: null
        }

        todos.push(newTodo)

        res.json(newTodo)
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if(isNaN(id)) return res.status(400).json({ error: 'id must be a number' });

        const todo = todos.find(todo => todo.id === id);

        if(!todo) return res.status(404).json({ error: `TODO with id ${id} not found` })

        const { name, createdAt } = req.body;

        todo.name = name || todo.name;
        (createdAt == 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date(createdAt || todo.completedAt)
        //! Se pasa el objeto por referencia

        res.json(todo)
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if(isNaN(id)) return res.status(400).json({ error: 'id must be a number' });

        const todo = todos.find(todo => todo.id === id);

        if(!todo) return res.status(404).json({ error: `TODO with id ${id} not found` })

        todos.splice(todos.indexOf(todo), 1)

        res.json(todo)
    }
}