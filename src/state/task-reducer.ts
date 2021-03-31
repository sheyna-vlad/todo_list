import {TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}


export const taskReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case '': {
             return  state
            }
        case '':{
           return state
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = ()