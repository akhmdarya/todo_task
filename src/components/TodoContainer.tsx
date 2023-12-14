import React from 'react';
import {todoApi} from "../services/TodoService";
import { styled } from '@mui/material/styles';
import {ITodo} from '../model/ITodo';
import TodoItem from "./TodoItem";
import classes from "../styles/TodoItem.module.css";
import { Switch, Typography} from "@mui/joy";
import {FormControlLabel, FormGroup} from "@mui/material";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import AddTodoForm from "./AddTodoForm";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const TodoContainer = () => {
    const handleCreate= async(todo:ITodo)=>{
        await createTodo(todo)
    }

    const handleUpdate = (todo:ITodo)=>{
        updateTodo(todo)
    }
    const [checked, setChecked] = React.useState(false);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const {data:todos,error,isLoading,refetch} = todoApi.useFetchAllTodosQuery([])
    const [updateTodo,{}] = todoApi.useUpdateTodoMutation()
    const [createTodo,{} ] = todoApi.useCreateTodoMutation()

    const completedTodos: ITodo[]= todos?.filter((t) => t.status === 'Completed')|| [];

    return (


        <Grid container spacing={1}>
            <Grid xs={2} sm={4} md={4}>
                <Item>Add New TODO
                    <AddTodoForm onAddTodo={handleCreate}></AddTodoForm>
                </Item>
            </Grid>

            <Grid xs={2} sm={4} md={4}>
                <Item>LIST OF ALL TODOS
                    {isLoading && <Typography>Loading</Typography>}
                    {error && <Typography>Ошибка</Typography>}
                        {todos&&todos.map(todo=>
                            <TodoItem todo = {todo}   key={todo.id}  update={handleUpdate}></TodoItem>
                        )}
                </Item>
            </Grid>

            <Grid xs={2} sm={4} md={4}>
                <Item>COMPLETED TODOS
                    <p>Completed Tasks: {completedTodos.length}</p>
                    <FormGroup className={classes.but}>
                        <FormControlLabel control={<Switch  onChange={handleChange} />} label="Show Completed" />
                    </FormGroup>
                    <div className={classes.list}>
                        {checked&&completedTodos.map(todo=>
                            <TodoItem todo = {todo}  key={todo.id}  update={handleUpdate}></TodoItem>
                        )}
                    </div>
                </Item>
            </Grid>
        </Grid>

    )
}

export default TodoContainer;
