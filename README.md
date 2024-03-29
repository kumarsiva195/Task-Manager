# Task Manager

## Project Description

This project is a task management application built using React. The application allows users to create, view, edit, and delete tasks. It includes features such as task filtering, sorting, and search functionality. Users can easily organize their tasks and keep track of their progress using this application.

## Installation Instructions

To add dependency packages, follow these steps:

1. Run `npm install --legacy-peer-deps` in your terminal.
2. To start the server, run `npm start`.

## External Dependencies

- Material UI
- ag-Grid

## Overview of the Project Structure

In this project, we use React's `useState` hook to manage tasks. We initialize it with tasks stored in local storage or an empty array if no tasks are stored.

We use state variables to manage form inputs and the search term.

There's a utility function to save tasks to local storage.

Using the `useEffect` hook, we fetch tasks from local storage when the component mounts and set them to the tasks state.

The `addTask` function handles adding a new task or editing an existing one. It performs validation checks and updates the tasks state accordingly. It also resets the form and the state after adding or editing a task.

The `deleteTask` function removes a task from the tasks list and updates the local storage.

The `editTask` function sets the form fields to the values of the task being edited and switches the mode to edit.

The `markAsComplete` function toggles the completed status of a task.

The `filteredTasks` variable filters tasks based on the search term entered by the user.
