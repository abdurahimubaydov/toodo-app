import { createSlice } from "@reduxjs/toolkit";

interface IDeleteTodos {
    select_all: boolean,
    deleting_todos: number[] | null,
}

const initialState: IDeleteTodos = {
    select_all: false,
    deleting_todos: null
};


const DeleteReducers = createSlice({
    name: 'delete',
    initialState,
    reducers: {
        setDeleteStatus: (state, action) => {
            state.select_all = action.payload
        },

        selectAllDeletingTodosId: (state, action) => {
            state.deleting_todos = action.payload
        }
    }
});


export const { setDeleteStatus, selectAllDeletingTodosId } = DeleteReducers.actions;
export default DeleteReducers.reducer;