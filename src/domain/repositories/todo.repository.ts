import { TodoEntity } from "../entities/todo.entity";
import { CreateTodoDto } from '../dtos/todos/create-todo.dto';
import { UpdateTodoDto } from "../dtos";

export abstract class TodoRepository {
    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>
    //TODO:paginacion
    abstract getAll(): Promise<TodoEntity[]>
    
    abstract findById(id: number): Promise<TodoEntity>
    abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>
    abstract deleteById(id: number): Promise<TodoEntity>
}