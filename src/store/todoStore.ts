import { createSlice } from '@reduxjs/toolkit'

let todo = createSlice({
    name: "todo",
    initialState: [],
    reducers: {
        // 할일추가 / 할일체크 / 할일삭제 / 할일수정


    }
})



// import { create } from 'zustand'

// export type ToDoListType = {
//     todoList : ToDoType[]
// }

// export type ToDoType = {
//     id: number;
//     todo: string;
//     done: boolean;
// }

// const todoStore = create((set)=>({
//     todos: [],
//     addToDo : 
//     toggleToDo :
//     removeToDo : 
//     updateToDo : (text: string, id: number) => {
//         set((state) => ({}))
//     }
    
// }));

// export default todoStore;