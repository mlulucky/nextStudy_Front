import ToDoCreateRequestDTO from "@/dto/ToDoCreateRequestDTO";
import { addAPI, getListAPI } from "@/pages/api/todo";
import todoStore from "@/store/todoStore";
import userStore from "@/store/userStore";
import { useCookies } from "react-cookie";


export default function useToDoService() {
    const [cookies, setCookies] = useCookies();
    const {user, setUser, removeUser} = userStore(); 
    const {setToDoList} = todoStore();

    // 리스트 불러오기 (api + 로직_상태저장)
    const getToDos = async () => {
       const todoList = await getListAPI(cookies.token, user.id);
       console.log(todoList);
       if(!todoList) {
            alert('리스트 불러오기에 실패했습니다.');
            return;
        }        
        setToDoList(todoList);
    }

    // 할일 등록 🎄함수 정리좀 해야함.
    const addToDoService = async (data: ToDoCreateRequestDTO) => {
        // setToDoList((prevTodos) => [...prevTodos, data]);
        console.log("cookies token", cookies.token);
        return await addAPI(data, cookies.token);
    }

    return { getToDos, addToDoService }

}