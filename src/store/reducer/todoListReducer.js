import { TODOLIST_ACTION_TYPE } from "../action/todoListAction";

const addTodoItem = (state, todo) => {
    let newState = [...state]
    newState.push(todo)
    return newState
}

const deleteTodoItem = (state, todo) => {
    return state.filter((item) => item.id !== todo.id)
}

const updateTodoItem= (state, updatedTodo) => {
    let newTodoState = state.map(item => {
        if(item.id === updatedTodo.id){
            return updatedTodo;
        }
        return item;
    })
    return newTodoState;
}


export const todoListReducer = (state = [], action) => {
    console.log("state", state)
    console.log("action", action)
    switch(action.type) {
        case TODOLIST_ACTION_TYPE.INITIAL_DATA:
            return action.todoList
        case TODOLIST_ACTION_TYPE.ADD:
            return addTodoItem(state, action.todo)
        case TODOLIST_ACTION_TYPE.DELETE:
            return deleteTodoItem(state, action.todo)
        case TODOLIST_ACTION_TYPE.UPDATE:
            return updateTodoItem(state, action.todo)
        default:
            return state
    }
}
