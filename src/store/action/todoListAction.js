export const TODOLIST_ACTION_TYPE = {
    ADD: 'ADD',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    INITIAL_DATA: "INITIAL_DATA"
}

export const addTodo = (todo) => ({
    type: TODOLIST_ACTION_TYPE.ADD,
    todo
})

export const updateTodo = (todo) => ({
    type: TODOLIST_ACTION_TYPE.UPDATE,
    todo
})

export const deleteTodo = (todo) => ({
    type: TODOLIST_ACTION_TYPE.DELETE,
    todo
})

export const initTodoList = (todoList) => ({
    type: TODOLIST_ACTION_TYPE.INITIAL_DATA,
    todoList
})