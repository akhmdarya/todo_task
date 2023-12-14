import React, { useState } from 'react';
import {Button, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material';
import {ITodo} from "../model/ITodo";



interface AddTodoProps {
    onAddTodo: (newTodo: ITodo) => void;
}

const AddTodoForm: React.FC<AddTodoProps> = ({ onAddTodo }) => {
    const [newTodo, setNewTodo] = useState<ITodo>({
        id:0,
        title: '',
        description: '',
        status: null,
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewTodo((prevTodo) => ({
            ...prevTodo,
            [name]: value,
        }));
    };

    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        setNewTodo((prevTodo) => ({
            ...prevTodo,
            status: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (newTodo.title.length > 30 || newTodo.description.length > 30) {
            setError('Title and description must be 30 characters or less.');
            return;
        }

             onAddTodo({
                 ...newTodo,
                 id: Date.now(),
             });


        setNewTodo({
            id: 0,
            title: '',
            description: '',
            status: null,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                name="title"
                value={newTodo.title}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                name="description"
                value={newTodo.description}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    name="status"
                    value={newTodo.status || ''}
                    onChange={handleStatusChange}
                    required
                >
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="In progress">In progress</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                </Select>
            </FormControl>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Button type="submit" variant="contained" color="primary">
                Add Todo
            </Button>
        </form>
    );
};

export default AddTodoForm;
