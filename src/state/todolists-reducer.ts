import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionsType =
    RemoveTodolistAT |
    AddTodolistAT |
    ChangeTodolistAT |
    ChangeTodolistFilterAT

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
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


export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
             return  state.filter(t => t.id !== action.id)

            }
        case 'ADD-TODOLIST':{
            let newTodolist: TodoListType = {
                id: v1(),
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
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {type: 'REMOVE-TODOLIST', id: todolistId }
}
export const AddTodolistAC = (title: string): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', title }
}
export const ChangeTodolistAC = (title: string, id: string): ChangeTodolistAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id }
}
export const ChangeTodolistFilterAC = ( id: string, filter: FilterValuesType): ChangeTodolistFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter }
}