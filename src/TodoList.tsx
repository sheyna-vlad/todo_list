import React, {ChangeEvent, MouseEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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

    const onALLClickHandler = (e: MouseEvent<HTMLButtonElement>) => props.changeFilter("All", props.id);
    const onActiveClickHandler = (e: MouseEvent<HTMLButtonElement>) => props.changeFilter("Active", props.id)
    const onCompletedClickHandler = (e: MouseEvent<HTMLButtonElement>) => props.changeFilter("Compleated", props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addTask = (title: string) =>{
        props.addTask(title, props.id)
    }

     const changeTodolistTitle = (newTitle: string ) => {
         props.changeTodolistTitle(props.id, newTitle)
     }


    return (
        <div>
            <div className="App">
                <div>
                    <h3>  <EditableSpan title={props.title} onChange={ changeTodolistTitle  } />
                        <button onClick={removeTodolist}>x</button>

                    </h3>
                    < AddItemForm addItem={addTask}/>
                    <ul>
                        {
                            props.tasks.map((t) => {
                                const onRemoveHandler = () => props.removeTask(t.id, props.id)
                                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>{
                                    props.changeStatus(t.id, e.currentTarget.checked, props.id)
                                }
                                const onChangeTitleHandler = (newValue: string) =>{
                                    props.changeTaskTitle(t.id, newValue, props.id)
                                }


                                return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                    <input type="checkbox"
                                           checked={t.isDone}
                                           onChange={onChangeStatusHandler}
                                           className={t.isDone ? 'is-done' : ''}
                                            />
                                    <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                                    <button onClick={onRemoveHandler}>x
                                    </button>

                                </li>
                            })
                        }
                    </ul>
                    <div>
                        <button className={props.filter === 'All' ? 'active-filter' : ''}
                                onClick={onALLClickHandler}>All
                        </button>
                        <button className={props.filter === 'Active' ? 'active-filter' : ''}
                                onClick={onActiveClickHandler}>Active
                        </button>
                        <button className={props.filter === 'Compleated' ? 'active-filter' : ''}
                                onClick={onCompletedClickHandler}>Completed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export  default Todolist;
