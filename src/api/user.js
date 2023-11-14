import axios from 'axios';

const host = 'http://localhost:8000'; // TODO Проставлять динамически, чтобы нельзя было получить в браузере
const uri = `${host}/api/user`;

export const Users = {
    get: () => axios.get(`${uri}/all`),
};
