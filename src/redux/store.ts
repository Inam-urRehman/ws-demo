import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import AppReducer from "src/redux/reducer";

const store = createStore(AppReducer, applyMiddleware(thunk));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
