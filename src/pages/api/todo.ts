import axios from "axios";

export const toDoAPI = async (url: string, data: any) => {
    const response = await axios.post(url, data).catch((error) => {console.log(error); null});
    if(!response) return null;

    const result = response.data;
    return result;
}

export const addToDoAPI = (data: any) => {
    const url = "/api/todo/1/todos";
    return toDoAPI(url, data);
}