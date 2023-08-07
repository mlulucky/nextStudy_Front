import { useReducer } from 'react';

export type ToDoItemType = {
  todos : ToDos[]  
};

export type ToDos = {
    id: number;
    todo: string;
    done: boolean;
}

export function useToDo() {
  const initialState : ToDoItemType = {
    todos: []
  }

  function reducer( // state 수정하는 함수 
    state: ToDoItemType,
    action:
      | { type: "ADD_TODO"; payload : { text: string } }
      | { type: "TOGGLE_TODO"; payload: { id: number } }
      | { type: "REMOVE_TODO"; payload: { id: number } }
  ): ToDoItemType {

    switch (action.type) {
      case "ADD_TODO" :
        const maxId = state.todos.length > 0 ? Math.max(...state.todos.map(todo => todo.id)) : 0
        const addId = maxId + 1; 
        return {
          todos : [...state.todos, { id: addId, todo: action.payload.text, done: false }]
        }
      case "TOGGLE_TODO" :
        return {
          todos: state.todos.map(todo => {
            return todo.id === action.payload.id ? { ...todo, done: !todo.done } : todo
          })
        }
      case "REMOVE_TODO" : 
        return {
         todos: state.todos.filter(todo => todo.id !== action.payload.id)  // to do 리스트의 id 가 내가 선택한 id 와 같지 않은 todo 만 반환 (같은 todo 는 제외 - 삭제효과)
        }
      default:
        return state;
    }
    
  }

  
  const [state, dispatch] = useReducer(reducer, initialState); // dispatch( action ) : reducer 함수를 호출하는 함수, state 변경을 요청 

  function addToDo(text: string) {
    dispatch({ type: "ADD_TODO", payload: { text } }); 
  }

  function toggleToDo(id: number) {
    dispatch({ type: "TOGGLE_TODO", payload: { id } });
  }

  function removeToDo(id: number) {
    dispatch({ type: "REMOVE_TODO", payload: { id } });
  }

  return { state, addToDo, toggleToDo, removeToDo };

}


