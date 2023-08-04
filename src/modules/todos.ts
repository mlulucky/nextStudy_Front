import { useReducer } from 'react';


export type ToDoItem = {
  id: number;
  todo: string;
  done: boolean;
};

// useReducer 사용법
// function reducer(state, action) {  } // reducer 함수( ) : state 를 업데이트하고 리렌더링 촉발하는 함수 // action 은 업데이트를 위한 정보 // reducer : 이전 상태 state 와 Action을 합쳐, 새로운 state를 만드는 조작
// const [state, dispatch] = useReducer(reducer, initialState); // / useReducer : 상태관리 (useState 를 대체하는 함수. 컴포넌트 바깥에서 상태 업데이트 관리가능) 

export function useToDo() {
  const initialState: ToDoItem[] = [
    { id: 1, todo: "오늘의 할일", done: false },
    { id: 2, todo: "투두리스트", done: false },
    { id: 3, todo: "테스트중", done: true },
  ];

  const [state, dispatch] = useReducer(reducer, initialState); // dispatch : reducer(todos) 를 호출하는 함수 

  // console.log("state 추가", state);

  // reducer 구현 -  현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수
  // function todos(
  function reducer( // state 수정하는 함수 
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
          return state.filter((todo) => { return todo.id !== action.id }) // to do 리스트의 id 가 내가 선택한 id 와 같지 않은 todo 만 반환 (같은 todo 는 제외 - 삭제효과)
      default:
        return state;
    }
  }


  function addToDo(text: string) {
    console.log("addToDo is called with text:", text);
    dispatch({ type: "ADD_TODO", text }); 
    console.log("state 추가", state);
  }

  function toggleToDo(id: number) {
    dispatch({ type: "TOGGLE_TODO", id });
  }

  function removeToDo(id: number) {
    dispatch({ type: "REMOVE_TODO", id });
  }

  return { state, addToDo, toggleToDo, removeToDo };

}







// push vs concat
// Redux와 같은 상태 관리 라이브러리는 불변성을 유지 => 새로운 상태를 생성하여 반환하는 것이 중요 (Redux와 같은 상태 관리 라이브러리는 이전 상태와 현재 상태를 비교하여 상태 변경을 감지하는데 어려움을 겪을 수 있습니다)
// state.concat(): 기존 배열과 다른 배열 또는 값들을 합쳐서 새로운 배열을 생성합니다. 기존 배열은 변경되지 않고 유지됩니다.
// state.push()를 사용하면 기존의 state 배열이 변경되기 때문에 불변성이 깨지게 됩니다.
