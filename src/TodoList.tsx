import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TypeTask = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TypeTask>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    filter: FilterValuesType
    id: string

}
const Todolist = (props: PropsType) => {

    const onALLClickHandler = () => props.changeFilter("All", props.id);
    const onActiveClickHandler = () => props.changeFilter("Active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("Compleated", props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    },[])

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    return (
        <div>
            <div className="App">
                <div>
                    <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                        <IconButton onClick={removeTodolist}>
                            <Delete/>
                        </IconButton>

                    </h3>
                    < AddItemForm addItem={addTask}/>
                    <ul style={{listStyle: "none", paddingLeft: "0"}}>
                        {
                            props.tasks.map((t) => {
                                const onRemoveHandler = () => props.removeTask(t.id, props.id)
                                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeStatus(t.id, e.currentTarget.checked, props.id)
                                }
                                const onChangeTitleHandler = (newValue: string) => {
                                    props.changeTaskTitle(t.id, newValue, props.id)
                                }


                                return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                    <Checkbox
                                        color={"primary"}
                                        onChange={onChangeStatusHandler}
                                        className={t.isDone ? 'is-done' : ''}
                                        checked={t.isDone}
                                    />


                                    <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>

                                    <IconButton onClick={onRemoveHandler}>
                                        <Delete/>
                                    </IconButton>

                                </li>
                            })
                        }
                    </ul>
                    <div>
                        <Button
                            size={"medium"}
                            color={props.filter === 'All' ? "secondary" : 'primary'}
                            variant={props.filter === 'All' ? "contained" : 'text'}
                            onClick={onALLClickHandler}>All
                        </Button>
                        <Button
                            size={"medium"}
                            color={props.filter === 'Active' ? "secondary" : 'primary'}
                            variant={props.filter === 'Active' ? "contained" : 'text'}
                            onClick={onActiveClickHandler}>Active
                        </Button>
                        <Button
                            size={"medium"}
                            color={props.filter === 'Compleated' ? "secondary" : 'primary'}
                            variant={props.filter === 'Compleated' ? "contained" : 'text'}
                            onClick={onCompletedClickHandler}>Completed
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Todolist;
