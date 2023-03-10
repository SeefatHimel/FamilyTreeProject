import { configureStore } from "@reduxjs/toolkit";
import membersReducer from "../hooks/reducers/membersReducer";
import userReducer from "../hooks/reducers/userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    members : membersReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
