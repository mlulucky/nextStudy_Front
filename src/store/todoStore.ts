import { create } from 'zustand'

type ToDos = {
    id: number;
    content: string;
    done: boolean;
  }

interface TodoStore {
    todos: ToDos[];
    setToDoList: (todo: any) => void;
}

const todoStore = create<TodoStore>((set)=>({
    todos: [], // todo 기본값 지정
    setToDoList : (todos: any) => {
        set((state) => ({...state, todos}))
    },

}));

export default todoStore;