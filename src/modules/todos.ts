import { useReducer } from 'react';

type ToDoItem = {
  id: number;
  todo: string;
  done: boolean;
};

const initialState: ToDoItem[] = [
  { id: 1, todo: "오늘의 할일", done: false },
  { id: 2, todo: "투두리스트", done: false },
  { id: 3, todo: "테스트중", done: true },
];

// reducer 구현 -  현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수
// function todos(
export default function todos(
  state: ToDoItem[] = initialState,
  //   action: ToDoAcion
  action:
    | { type: "ADD_TODO"; text: string }
    | { type: "TOGGLE_TODO"; id: number }
    | { type: "REMOVE_TODO"; id: number }
): ToDoItem[] {
  switch (action.type) {
    case "ADD_TODO" :
      const addId = Math.max( ...state.map((todo) => { return todo.id; })) + 1; // todo : initialState 의 요소(객체)
      return [...state, { id: addId, todo: action.text, done: false }];
    case "TOGGLE_TODO" :
        return state.map((todo) => { return todo.id === action.id ?  { ...todo, done: !todo.done } : todo });
    case "REMOVE_TODO" : 
        return state.filter((todo) => { return todo.id !== action.id })
    default:
      return state;
  }

}

// export default function useToDo() {
//     const [state, dispatch] = useReducer(todos, initialState);

//     function ADD_TODO(text: string) {
//         dispatch({ type: "ADD_TODO", text });
//     }

//     function TOGGLE_TODO(id: number) {
//         dispatch({ type: "TOGGLE_TODO", id });
//     }

//     function REMOVE_TODO(id: number) {
//         dispatch({ type: "REMOVE_TODO", id });
//     }

//     return { state, ADD_TODO, TOGGLE_TODO, REMOVE_TODO };

// }







// push vs concat
// Redux와 같은 상태 관리 라이브러리는 불변성을 유지 => 새로운 상태를 생성하여 반환하는 것이 중요 (Redux와 같은 상태 관리 라이브러리는 이전 상태와 현재 상태를 비교하여 상태 변경을 감지하는데 어려움을 겪을 수 있습니다)
// state.concat(): 기존 배열과 다른 배열 또는 값들을 합쳐서 새로운 배열을 생성합니다. 기존 배열은 변경되지 않고 유지됩니다.
// state.push()를 사용하면 기존의 state 배열이 변경되기 때문에 불변성이 깨지게 됩니다.
