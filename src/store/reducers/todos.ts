import { createSlice } from "@reduxjs/toolkit";
import ITodo from "../../types/todo";
import { setTodosStorage } from "../../helpers/storage";

interface ITodoSlice {
    todos: ITodo[] | null
}

const initialState: ITodoSlice = {
    todos: [
        { id: 0, title: 'Day 1', desc: 'Buying some milk', complited: false }
    ]
};

const TodosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        createNewTodo: (state, action) => {
            state.todos = action.payload
            setTodosStorage('todos', JSON.stringify(action.payload))
        },

        setTodos: (state, action) => {
            state.todos = action.payload
        },

        setDeletedTodos: (state, action) => {
            state.todos = action.payload
            setTodosStorage('todos', JSON.stringify(action.payload))
        }
    }
});

export const { createNewTodo, setTodos, setDeletedTodos } = TodosSlice.actions;
export default TodosSlice.reducer;