import React, {useCallback, useReducer} from 'react';
import './App.css';
import TodoList from './TodoList';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,

} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TasksStateType} from "./App";


export type FilterValuesType = "All" | "Compleated" | "Active";
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}



function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)
    const tasksObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    const removeTask = useCallback( (id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    },[dispatch])

    const addTask = useCallback( (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    },[dispatch])

    const changeTaskTitle = useCallback( (taskId: string, newValue: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newValue, todolistId))
    },[dispatch])


    const  changeStatus= useCallback( (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    },[dispatch])


    const changeFilter = useCallback( (value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    },[dispatch])


    const changeTodolistTitle = useCallback( (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistAC(newTitle, todolistId))
    },[dispatch])


    const removeTodolist = useCallback( (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    },[dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    },[dispatch])


    return (
        <div className='App'>


            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>

                <Grid container style={{padding: " 20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>


                <Grid container spacing={5}>
                    {
                        todolists.map((td) => {
                            let tasksForTodolist = tasksObj[td.id]


                            return <Grid item key={td.id}>
                                <Paper elevation={3} style={{padding: " 20px"}}>

                                    <TodoList
                                        key={td.id}
                                        title={td.title}
                                        id={td.id}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        filter={td.filter}
                                        changeStatus={changeStatus}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />

                                </Paper>
                            </Grid>

                        })
                    };
                </Grid>


            </Container>
        </div>
    );
}

export default AppWithRedux;
