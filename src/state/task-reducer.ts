import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, todolistId1, todolistId2} from "./todolists-reducer";

type ActionsType =
    RemoveTaskAT |
    AddTaskAT |
    ChangeTaskStatusAT |
    changeTaskTitleAT |
    AddTodolistAT |
    RemoveTodolistAT

export type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todolistId: string

}

export type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    id: string
    isDone: boolean

}
export type changeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    id: string
    title: string
}
const initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'Ts', isDone: true},
        {id: v1(), title: 'CSS', isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: 'Книги', isDone: false},
        {id: v1(), title: 'Хлеб', isDone: true},
        {id: v1(), title: 'Воду', isDone: true},
        {id: v1(), title: 'Молоко', isDone: true}

    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            stateCopy[action.todolistId]  = tasks.filter(task => task.id !== action.taskId);
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            let newTask = {id: v1(), title: action.title, isDone: false}
            let tasks = state[action.todolistId]
            stateCopy[action.todolistId] = [newTask, ...tasks];
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let tasks = state[action.todolistId]
            state[action.todolistId] = tasks
                .map(t => t.id === action.todolistId
                    ? {...t, isDone: action.isDone}
                    : t)

            return {...state};
        }
        case 'CHANGE-TASK-TITLE': {
            let tasks = state[action.todolistId]
            state[action.todolistId] = tasks
                .map(t => t.id === action.id
                    ? {...t, title: action.title}
                    : t)

            return {...state};
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy;
        }


        default:
            return state
    }
}


export const removeTaskAC = (taskId: string, todolistId: string,): RemoveTaskAT => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, id, isDone}
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): changeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', id, title, todolistId}
}
