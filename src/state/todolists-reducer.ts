import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionsType =
    RemoveTodolistAT |
    AddTodolistAT |
    ChangeTodolistAT |
    ChangeTodolistFilterAT


export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState : Array<TodoListType> = [
    {id: todolistId1, title: 'What to learn', filter: 'Active'},
    {id: todolistId2, title: 'What to buy', filter: 'All'}
]

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
             return  state.filter(t => t.id !== action.todolistId)

            }
        case 'ADD-TODOLIST':{
            let newTodolist: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: 'All'
            }
            return [
                ...state,
                newTodolist,
            ]
        }
        case 'CHANGE-TODOLIST-TITLE':{
            const todolist = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]

        }
        case 'CHANGE-TODOLIST-FILTER':
            let todolist = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        default:
           return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {type: 'REMOVE-TODOLIST', todolistId: todolistId }
}
export const addTodolistAC = (title: string): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1() }
}
export const changeTodolistAC = (title: string, id: string): ChangeTodolistAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id }
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter }
}