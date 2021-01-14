import axios from "axios";

export interface User {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
}

export const signUp = (user: User) => {
    return axios.post('/api/1.0/users', user);
};
