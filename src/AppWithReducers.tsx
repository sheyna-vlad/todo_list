import React, {useReducer} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";


export type FilterValuesType = "All" | "Compleated" | "Active";
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}


function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer,{
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
    })


    function removeTask(id: string, todolistId: string) {
        dispatchTasksReducer(removeTaskAC(id,todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchTasksReducer(addTaskAC(title,todolistId))
    }

    function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
        dispatchTasksReducer(changeTaskTitleAC(taskId,newValue,todolistId))
    }


    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatchTasksReducer(changeTaskStatusAC(taskId,isDone,todolistId))
    }




    let [todolists, dispatchTodolistsReducer] = useReducer( todolistsReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'Active'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]);

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchTodolistsReducer(changeTodolistFilterAC(todolistId,value))
    }


    function changeTodolistTitle(todolistId: string, newTitle: string) {
        dispatchTodolistsReducer(changeTodolistAC(newTitle,todolistId))
    }


    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatchTasksReducer(action)
        dispatchTodolistsReducer(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchTasksReducer(action)
        dispatchTodolistsReducer(action)
    }


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
                            if (td.filter === "Compleated") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                            }
                            if (td.filter === "Active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                            }

                            return <Grid item key={td.id}>
                                <Paper  elevation={3} style={{padding: " 20px"}}>

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

export default AppWithReducers;
