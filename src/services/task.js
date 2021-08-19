import axios from 'axios';

export const createTask = async (data) => {
    const response = await axios.post('https://tasks-ark-server.herokuapp.com/tasks', data);
    return response.data;
}

export const getActiveTasks = async () => {
    const response = await axios.get('https://tasks-ark-server.herokuapp.com/tasks')
    return response.data;
}

export const getCompletedTasks = async () => {
    const response = await axios.get('https://tasks-ark-server.herokuapp.com/tasks/completed')
    return response.data;
}

export const deleteTask = async (id) => {
    const response = await axios.delete(`https://tasks-ark-server.herokuapp.com/tasks/${id}`)
    return response.data;
}

export const updateTask = async (task) => {
    const { id, data } = task;
    const response = await axios.patch(`https://tasks-ark-server.herokuapp.com/tasks/${id}`, data)
    return response.data;
}

export const getTaskById = async (data) => {
    const { currentTaskId } = data.queryKey[1];
    console.log(currentTaskId);
    const response = await axios.get(`https://tasks-ark-server.herokuapp.com/tasks/${currentTaskId}`)
    return response.data;
}

export const updateTaskStatus = async (task) => {
    const { id, data } = task;
    const response = await axios.patch(`https://tasks-ark-server.herokuapp.com/tasks/status/${id}`, data)
    return response.data;
}

export const getTasksLastWeek = async () => {
    const response = await axios.get('https://tasks-ark-server.herokuapp.com/tasks/last-week')
    return response.data;
}