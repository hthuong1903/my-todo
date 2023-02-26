import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { todoListReducer } from "./reducer/todoListReducer";

const store = configureStore({
    reducer: combineReducers({
        todoList: todoListReducer
    })
})

export default store