import { getListAPI } from "@/pages/api/todo";
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




    
    return { getToDos }

}