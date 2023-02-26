import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip, Button } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Box } from '@mui/system';
import ModelAddTodoItem from '../AddTodo/ModelAddTodoItem';
import { useState } from 'react';
import ModelUpdateTodoItem from '../UpdateTodo/ModelUPdateTodoItem';
import { initTodoList } from '../../store/action/todoListAction';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteTodo } from '../../store/action/todoListAction';

export default function DataTable() {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const dispatch = useDispatch()
    const [todoId, setTodoId] = useState('')
    const [todoItem, setTodoItem] = useState({})
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(res => res.json())
            .then(todos => {
                dispatch(initTodoList(todos.slice(0,10)));
            })
    }, [])

    let todoList = useSelector((state) => state.todoList)
    console.log("todoList",todoList)

    let doneRow = todoList.reduce((ids, thing) => {
        if (thing.completed === true) {
            ids.push(thing)
        }
        return ids;
    }, [])

    let todoRow = todoList.reduce((ids, thing) => {
        if (thing.completed === false) {
            ids.push(thing)
        }
        return ids;
    }, [])

    const columns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            headerAlign: 'center',
            align: 'center',
            flex: 0.5
        },
        { 
            field: 'userId', 
            headerName: 'UserId', 
            headerAlign: 'center',
            align: 'center',
            flex: 1 
        },
        { 
            field: 'title', 
            headerName: 'title', 
            headerAlign: 'center',
            align: 'center',
            flex: 1.5
        },
        {
            field: 'view',
            headerName: 'Action',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            renderCell: (params) => {
                // console.log("params", params)
                return (
                    <>
                        <Tooltip title="Xóa">
                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => {
                                    dispatch(deleteTodo(params))
                                }}
                                >
                                <ClearRoundedIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => {
                                    setIsOpenUpdateModal(true)
                                    setTodoItem(params.row)
                                }}>
                                <EditRoundedIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
        }
    ];
    return <>
        {isOpenAddModal && (
            <ModelAddTodoItem 
                isOpen={isOpenAddModal}
                handleClose={() => setIsOpenAddModal(false)}
            />
        )}
        {isOpenUpdateModal && (
            <ModelUpdateTodoItem 
                isOpen={isOpenUpdateModal}
                handleClose={() => setIsOpenUpdateModal(false)
                }
                todo={todoItem}
            />
        )}
        <h2>Add Todo Item</h2>
            <Box sx={{ mb: 10, mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        setIsOpenAddModal(true)
                    }}>
                    Add todo Item
                </Button>
            </Box>
        <div style={{ height: 400, width: '60%', textAlign: 'center', marginLeft: '23%'}}>
            <h1>Todo</h1>
            <DataGrid
                rows={todoRow}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
            
            <h1>Done</h1>
            <DataGrid
                rows={doneRow}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    </>

}