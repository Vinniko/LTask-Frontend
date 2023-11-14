import axios from 'axios';

const host = 'http://localhost:8000'; // TODO Проставлять динамически, чтобы нельзя было получить в браузере
const uri = `${host}/api/task`;

export const Task = {
    statuses: () => axios.get(`${uri}/statuses`),
    all: () => axios.get(`${uri}/all`),
    get: (id) => axios.get(`${uri}/${id}`),
    create: (data) => axios.post(`${uri}/store`, data),
    update: (id, data) => axios.put(`${uri}/update/${id}`, data),
};
