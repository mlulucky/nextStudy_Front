import ToDoCreateRequestDTO from "@/dto/ToDoCreateRequestDTO";
import ToDoDTO from "@/dto/ToDoDTO";
import { addAPI, getListAPI, modifyAPI } from "@/pages/api/todo";
import todoStore from "@/store/todoStore";
import userStore from "@/store/userStore";
import { useCookies } from "react-cookie";

export type UseToDoServiceType = {
  getToDos: () => Promise<void>;
  addToDoService: (data: ToDoCreateRequestDTO) => Promise<void>;
  modifyToDoService: (data: ToDoDTO) => Promise<void>;
  changeDoneService: (data: ToDoDTO) => Promise<void>;
};

export default function useToDoService(): UseToDoServiceType {
  const [cookies] = useCookies();
  const { user } = userStore();
  const { setToDoList, addToDoList, updateToDoList, isDoneToDo } = todoStore();

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
    const addedToDo = await addAPI(cookies.token, data); // id, content, done, message
    if (!addedToDo) {
      alert("할일 등록을 실패했습니다.");
      return;
    }
    addToDoList(addedToDo); // todo - state 상태저장 -> 렌더링 
    alert("할일 등록을 성공했습니다.");
  };

	const modifyToDoService = async (data: ToDoDTO) => {
		const modifiedToDo = await modifyAPI(cookies.token, data);
		if(!modifiedToDo) {
			alert("할일 수정을 실패했습니다.");
			return;
		}
		console.log("modifiedToDo", modifiedToDo); 
		updateToDoList(data.id, data.content);
	}

	const changeDoneService = async (data: ToDoDTO) => {
		const modifiedToDo = await modifyAPI(cookies.token, data);
		if(!modifiedToDo) {
			alert("할일 수정을 실패했습니다.");
			return;
		}
		console.log("changeDoneService", data);
    updateToDoList(data.id, data.content);
	}


  return { getToDos, addToDoService, modifyToDoService, changeDoneService};
}

