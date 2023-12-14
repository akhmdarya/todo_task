import React, { FC, useEffect, useState} from 'react';
import {ITodo} from "../model/ITodo";
import classes from "../styles/TodoItem.module.css";
import Card from "@mui/joy/Card";
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Option from '@mui/joy/Option';
import {Select} from "@mui/joy";

interface TodoItemItemProps{
    todo:ITodo;
    update:(todo:ITodo) => void
}


const TodoItem: FC<TodoItemItemProps> = ({ todo,update }) => {
    const [selectedStatus, setSelectedStatus] = useState<string | null>('');
    const [statusVariants, setStatusVariants] = useState<string[]>([]);

    useEffect(() => {
        setSelectedStatus(todo.status);
        // @ts-ignore
        setStatusVariants(getStatusVariants(todo));
    }, [todo.status]);

    const getStatusVariants = (todo: TodoItemItemProps['todo']) => {
        // Extract unique status variants from the todo object
        return Array.from(new Set([todo.status, 'In progress', 'Pending', 'Completed']));
    };



    const handleChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        setSelectedStatus(newValue);
        console.log('setSelectedStatus', todo.id, newValue);
        update({...todo, status:newValue})
    };


    return (

        <div className={classes.list}>
            <Card className={classes.card} variant="solid">
                <CardContent>
                    <Typography level="title-md" textColor="inherit">
                       Title: {todo.title}
                    </Typography>
                    <Typography textColor="inherit">Description: {todo.description}</Typography>
                    <Select value={selectedStatus} onChange={handleChange}>
                        {statusVariants.map((status) => (
                            <Option key={status} value={status}>
                                {status}
                            </Option>
                        ))}
                    </Select>
                </CardContent>
            </Card>
        </div>


    );
};

export default TodoItem;
