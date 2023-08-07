import { ToDoItemType } from '@/hooks/useToDo';
import React from 'react';

export default function ToDoHead({state} : {state : ToDoItemType}) {
    const today = new Date();
    const dateName = today.toLocaleDateString('ko-KR', {
        year: 'numeric'
    })


    const undoneTasks = state.todos.filter(todo => !todo.done); // to.done 이 false 인 todo 배열
    return (
        <div style={{textAlign: "left", flex: "1"}}>
            <h1 style={{ margin: "0px"}}>2019년 8월 7일</h1>
            <span>수요일</span>
            <p>할일 {undoneTasks.length}개</p>
        </div>
    )
}