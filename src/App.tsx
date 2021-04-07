import React, {useState} from 'react';
import './App.css';
import TodoList, {TypeTask} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type FilterValuesType = "All" | "Compleated" | "Active";
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TypeTask>
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [tasksObj, setTasks] = useState<TasksStateType>({
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
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newValue;
            setTasks({...tasksObj})
        }
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }




    let [todolists, setTodolists] = useState<TodoListType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'Active'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]);

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(td => td.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }
    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const todolist = todolists.find(td => td.id === todolistId)
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }
    function removeTodolist(todolistId: string) {
        let filteredTodolists = todolists.filter(t => t.id !== todolistId)
        setTodolists(filteredTodolists);
        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }

    function addTodolist(title: string) {

        let todolist: TodoListType = {
            id: v1(),
            title,
            filter: 'All'
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj, [todolist.id]: []
        })

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
};

export default App;
