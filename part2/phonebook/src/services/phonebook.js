import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getPhone = () => {
    const request = axios.get(`${baseURL}`);
    return request.then(res => res.data);
}

const createPhone = (phoneObject) => {
    const request = axios.post(`${baseURL}`,phoneObject);
    return request.then(res => res.data);
}

export { getPhone, createPhone };