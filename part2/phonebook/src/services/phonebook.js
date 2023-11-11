import axios from "axios";

/* const baseURL = "http://localhost:3001/persons"; ---> json server */
/* const baseURL = "http://localhost:3001/api/persons" ---> local development*/
const baseURL = "/api/persons";

const getPhone = () => {
    const request = axios.get(`${baseURL}`);
    return request.then(res => res.data);
}

const createPhone = (phoneObject) => {
    const request = axios.post(`${baseURL}`,phoneObject);
    return request.then(res => res.data);
}

const deletePhone = (id) => {
    return axios.delete(`${baseURL}/${id}`);
}

const updatePhone = (id, phoneObject) => {
    const request = axios.put(`${baseURL}/${id}`,phoneObject);
    return request.then(res => res.data)
}

export { getPhone, createPhone, deletePhone, updatePhone };