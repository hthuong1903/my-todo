import { Grid } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { TextField, Box, FormControlLabel, Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import { addTodo } from '../../store/action/todoListAction';
import { toast } from 'react-toastify'
export default function ModelAddTodoItem({ isOpen, handleClose }) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState('');
    const [completed, setCompleted] = useState(false);

    const onClickAddTodo = () => {
        let newTodo = {
            userId,
            id: Math.random().toString(),
            title,
            completed
        }
        console.log("newTodo", newTodo)
        dispatch(addTodo(newTodo));
    }
    const onClickChecked = () => {
        setCompleted(!completed);
    }
    const onChangeTile = (e) => {
        setTitle(e.target.value)
    }
    const onChangeUserId = (e) => {
        setUserId(e.target.value)
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle id="alert-dialog-title">Add Todo Item</DialogTitle>
            <DialogContent>
                <Grid item xs={6} sx={{ '& .MuiTextField-root': { mb: 3 } }}>
                <Box sx={{ mt: 1 }}>
                    <TextField
                        required
                        size="small"
                        id="outlined-basic"
                        label="userId"
                        variant="outlined"
                        placeholder="Enter userId"
                        value={userId}
                        onChange={onChangeUserId}
                    />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            rows={6}
                            maxRows={10}
                            size="small"
                            id="outlined-basic"
                            label="title"
                            variant="outlined"
                            placeholder="Enter Title"
                            value={title}
                            onChange={onChangeTile}
                        />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <FormControlLabel control={<Checkbox checked={completed} onClick={onClickChecked}/>} label="Completed" />
                    </Box>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onClickAddTodo} autoFocus>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}