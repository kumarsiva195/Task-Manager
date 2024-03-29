import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { TextField, Button, Select, MenuItem, IconButton } from '@material-ui/core';
import '../../node_modules/ag-grid-community/styles/ag-grid.css';
import '../../node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import './taskmanager.css'

const TaskManager = () => {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        return storedTasks;
    });
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Low');
    const [searchTerm, setSearchTerm] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);

    const saveTasksToLocalStorage = (updatedTasks) => {
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        setTasks(storedTasks);
    }, []);

    const addTask = () => {
        if (!title) {
            alert('Please enter a title');
            return;
        }
        if (!description) {
            alert('Please enter a description');
            return;
        }
        if (!dueDate) {
            alert('Please select the date');
            return;
        }
        if (!priority) {
            alert('Please select the priority');
            return;
        }
        if (editMode && editTaskId) {
            const updatedTasks = tasks.map(task =>
                task.id === editTaskId ? { ...task, title, description, dueDate, priority } : task
            );
            setTasks(updatedTasks);
            saveTasksToLocalStorage(updatedTasks);
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('Low');
            setEditMode(false);
            setEditTaskId(null);
            return;
        }
        const newTask = {
            id: uuidv4(),
            title,
            description,
            dueDate,
            priority,
            completed: false,
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);  // Save tasks to local storage

        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Low');
    };

    const deleteTask = id => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
    };

    const editTask = id => {
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setDueDate(taskToEdit.dueDate);
            setPriority(taskToEdit.priority);
            setEditMode(true);
            setEditTaskId(id);
        }
    };

    const toggleCompleted = id => {
        const updatedTasks = tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task));
        // Below code onclick of mark as complete it will not be undone
        // const updatedTasks = tasks.map(task => ((task.id === id && !task.completed) ? { ...task, completed: !task.completed } : task));
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const gridOptions = {
        defaultColDef: {
            flex: 1,
            minWidth: 150,
            filter: true,
            sortable: true,
        },
        columnDefs: [
            { headerName: 'Title', field: 'title' },
            { headerName: 'Description', field: 'description' },
            { headerName: 'Due Date', field: 'dueDate' },
            { headerName: 'Priority', field: 'priority' },
            {
                headerName: 'Actions',
                cellRenderer: params => (
                    <>
                        <button onClick={() => toggleCompleted(params.data.id)}>
                            {params.data.completed ? 'Completed' : 'Mark as Completed'}
                        </button>
                        <button onClick={() => editTask(params.data.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <IconButton onClick={() => deleteTask(params.data.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </IconButton>
                    </>
                ),
            },
        ],
        rowData: filteredTasks,
    };

    return (
        <div className='taskManager' style={{ padding: '20px' }}>
            <h1>Task Manager</h1>
            <TextField
                label="Title"
                className="taskTitle"
                variant="outlined"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{ marginRight: '10px' }}
            />
            <TextField
                label="Description"
                className="taskTitle"
                variant="outlined"
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{ marginRight: '10px' }}
            />
            <TextField
                type="date"
                className="taskTitle"
                variant="outlined"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                style={{ marginRight: '10px' }}
            />
            <Select
                value={priority}
                className="taskTitle"
                onChange={e => setPriority(e.target.value)}
                style={{ marginRight: '10px' }}
            >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
            </Select>
            <Button className="taskTitle" variant="contained" color="primary" onClick={addTask}>
                {editMode ? <FontAwesomeIcon icon={faCheck} /> : 'Add Task'}
            </Button>
            <TextField
                label="Search Tasks"
                variant="outlined"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ margin: '0px 10px' }}
            />
            <div className="ag-theme-alpine" style={{ height: 400, width: '100%', marginTop: '20px' }}>
                <AgGridReact {...gridOptions} />
            </div>
        </div>
    );
};

export default TaskManager;