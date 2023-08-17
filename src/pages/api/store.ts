import ToDoItem from '@/components/ToDoItem';
import { createSlice } from '@reduxjs/toolkit';


type ToDoItem = {
    id: number,
    todo: string,
    done: boolean
}

const initialState: ToDoItem[] = [
    { id: 1, todo: "오늘의 할일", done: false },
    { id: 2, todo: "투두리스트", done: false },
    { id: 3, todo: "테스트중", done: true }
  ];

let toDo =  createSlice ({
    name: 'todo',
    initialState, // == iinitialState : initialState

    reducers: {
        // changeDone(state, actions : {type: 'setStatus', index: number, status: boolean}) { 
        //     // let index = state.findIndex(item => actions.payload === item.id);
        // },

    }
}) 



// 액션 타입 정의
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';
``
