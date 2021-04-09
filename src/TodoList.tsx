import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TypeTask = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TypeTask>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    filter: FilterValuesType
    id: string

}
const Todolist = React.memo(function (props: PropsType) {

    const onALLClickHandler = useCallback(() => props.changeFilter("All", props.id), [props.id, props.changeFilter]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("Active", props.id), [props.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("Compleated", props.id), [props.id, props.changeFilter])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    },[props.removeTodolist,props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodolistTitle = useCallback( (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    },[props.changeTodolistTitle,props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === "Compleated") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }
    if (props.filter === "Active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }


    return (
        <div>
            <div className="App">
                <div>
                    <h3>
                        <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                        <IconButton onClick={removeTodolist}>
                            <Delete/>
                        </IconButton>

                    </h3>
                    < AddItemForm addItem={addTask}/>
                    <ul style={{listStyle: "none", paddingLeft: "0"}}>
                        {
                            props.tasks.map(t => <Task
                            task={t}
                            removeTask={props.removeTask}
                            changeStatus={props.changeStatus}
                            todolistId={props.id}
                            changeTaskTitle={props.changeTaskTitle}
                            key={t.id}
                            />)
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
})

export default Todolist;
