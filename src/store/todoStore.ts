import { create } from "zustand";

export type ToDos = {
  id: number; // todo 의 자동생성 id
  content: string;
  done: boolean;
};

interface TodoStore {
  todos: ToDos[];
  setToDoList: (todos: ToDos[]) => void;
  addToDoList: (todo: ToDos) => void;
  isDoneToDo: (id: number) => void;
  updateToDoList: (id: number, content: string) => void;
  removeToDoList: (id: number) => void;
}

const todoStore = create<TodoStore>((set) => ({
  // set 함수 - 상태 업데이트를 처리 // state 는 업데이트 이전 현재상태
  todos: [], // state 
  setToDoList: (todos: ToDos[]) => {
    set((state) => ({ ...state, todos })); // { } 객체속성을 저장 - { todos: [{id: , content: , done: },{ } ...] } // todos (== todos: todos) todos 배열을 새로운 배열로 대체
  },
  addToDoList: (todo: ToDos) => {
    set((state) => ({ ...state, todos: [...state.todos, todo] })); // todo: {id: , content: , done:  }// todos: 기존 todos 배열 + 새로운 todo 추가
  },
  isDoneToDo: (id: number) => {
    set((state) => ({ todos: state.todos.map(todo => (todo.id === id ? {...todo, done: !todo.done} : todo))})); // { } 중괄호 : return 값을 명시해야함. () 소괄호 : return 명시 안해도 됨. 단일한 표현식 값을 자동으로 반환
  },
  updateToDoList: (id: number, content: string) => {
    set((state)=>({ todos: state.todos.map(todo =>(todo.id == id? {...todo, content: content} : todo))}));
  },
  removeToDoList: (id: number) => {
    set((state)=>({ todos: state.todos.filter(todo => { todo.id !== id })}))
  }
}));

export default todoStore;