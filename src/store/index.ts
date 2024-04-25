import { configureStore } from '@reduxjs/toolkit';
import _delete from './reducers/delete';
import _todos from './reducers/todos'

export const store = configureStore({
    reducer: {
        delete: _delete,
        todos: _todos
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;