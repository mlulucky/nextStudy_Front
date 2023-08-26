import ToDoCreateRequestDTO from "@/dto/ToDoCreateRequestDTO";
import { addAPI, getListAPI } from "@/pages/api/todo";
import todoStore from "@/store/todoStore";
import userStore from "@/store/userStore";
import { useCookies } from "react-cookie";

export type UseToDoServiceType = {
  getToDos: () => Promise<void>;
  addToDoService: (data: ToDoCreateRequestDTO) => Promise<void>;
};

export default function useToDoService(): UseToDoServiceType {
  const [cookies] = useCookies();
  const { user } = userStore();
  const { setToDoList, addToDoList } = todoStore();

  // 리스트 불러오기 (api + 로직_상태저장)
  const getToDos = async () => {
    const todoList = await getListAPI(cookies.token, user.id);
    console.log(todoList);
    if (!todoList) {
      alert("리스트 불러오기에 실패했습니다.");
      return;
    }
    setToDoList(todoList); // todo - state 상태저장 -> 렌더링
  };

  const addToDoService = async (data: ToDoCreateRequestDTO) => {
    const addedToDo = await addAPI(data, cookies.token); // id, content, done, message
    if (!addedToDo) {
      alert("할일 등록을 실패했습니다.");
      return;
    }
    addToDoList(addedToDo); // todo - state 상태저장 -> 렌더링 // 🔥 todo : id, content, done
    alert("할일 등록을 성공했습니다.");
  };

  return { getToDos, addToDoService };
}
