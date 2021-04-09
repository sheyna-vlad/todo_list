import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TypeTask} from "./TodoList";

type TaskPropsType = {
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    task: TypeTask
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveHandler = useCallback ( () => props.removeTask(props.task.id, props.todolistId),[props.removeTask,props.task.id,props.todolistId])

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    },[])



    return <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            color={"primary"}
            onChange={onChangeStatusHandler}
            className={props.task.isDone ? 'is-done' : ''}
            checked={props.task.isDone}
        />


        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>

        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>

    </li>
})