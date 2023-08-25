import { create } from 'zustand'

type ToDos = {
    id: number;
    content: string;
    done: boolean;
  }

interface TodoStore {
    todos: ToDos[];
    setToDoList: (todos: ToDos[]) => void;
}

const todoStore = create<TodoStore>((set)=>({
    todos: [], // todo 기본값 지정
    setToDoList : (todos: ToDos[]) => {
        set((state) => ({...state, todos}))
    },
    addToDoList : (todos: ToDos) => {
        // set((state) => ([...state, {}]))
    }
}));

export default todoStore;