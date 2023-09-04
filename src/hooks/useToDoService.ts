import ToDoCreateRequestDTO from "@/dto/ToDoCreateRequestDTO";
import ToDoDTO from "@/dto/ToDoDTO";
import { addAPI, deleteAPI, getListAPI, modifyAPI} from "@/pages/api/todo";
import todoStore from "@/store/todoStore";
import userStore from "@/store/userStore";
import { useCookies } from "react-cookie";

export type UseToDoServiceType = {
  getToDos: () => Promise<void>;
  addToDoService: (data: ToDoCreateRequestDTO) => Promise<void>;
  modifyToDoService: (data: ToDoDTO) => Promise<void>;
	deleteToDoService: (data: ToDoDTO) => Promise<void>;
};

export default function useToDoService(): UseToDoServiceType {
  const [cookies] = useCookies();
  const { user } = userStore();
  const { todos, setToDoList, addToDoList, updateToDoList, isDoneToDo, removeToDoList } = todoStore();

  // 리스트 불러오기 (api + 로직_상태저장)
  const getToDos = async () => {
    try {
			// 새로고침시 todolist 페이지 유지하기위해서 userId 는 state(새로고침되면 상태 초기화) 에 저장된 id가 아니라 로그인 성공 후 쿠키에 저장한 id 를 전달(쿠키는 새로고침해도 유지되므로)
			const todoList = await getListAPI(cookies.token, cookies.id); // 빈배열 또는 배열
			console.log(todoList);
			setToDoList(todoList); // todo - state 상태저장 -> 렌더링
		}catch(error) {
			console.error(error);
			alert("리스트를 불러오는데 실패했습니다.");
		}
	};

  const addToDoService = async (data: ToDoCreateRequestDTO) => {
    const addedToDo = await addAPI(cookies.token, data); // id, content, done, message
    if (!addedToDo) {
      alert("할일 등록을 실패했습니다.");
      return;
    }
    
    addToDoList(addedToDo);
    console.log(todos);
    alert("할일 등록을 성공했습니다.");
  };

	const modifyToDoService = async (data: ToDoDTO) => {
		const modifiedToDo = await modifyAPI(cookies.token, data);
		if(!modifiedToDo) {
			alert("할일 수정을 실패했습니다.");
			return;
		}	
		console.log("modifiedToDo", modifiedToDo); 
		updateToDoList(data);
	}

	const deleteToDoService = async (data: ToDoDTO) => {
		const success = await deleteAPI(cookies.token, data.id);
    if (!success) {
      alert("할일 삭제에 실패했습니다.");
      return;
    }
		removeToDoList(data.id); 
	}

  return { getToDos, addToDoService, modifyToDoService, deleteToDoService};
}

