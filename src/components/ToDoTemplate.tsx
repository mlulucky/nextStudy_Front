import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import ToDoItem from './ToDoItem'

const ToDoBlock = styled.div`
    border: 1px solid red;
    width: 500px;
`
const InsertForm = styled.form`
    background: #f8f9fa;
    padding-left: 32px;
    padding-top: 32px;
    padding-right: 32px;
    padding-bottom: 72px;

    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 85%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;
`


export default function ToDoTemplate(){
    const [oepn, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [toDoList, setToDoList] = useState<string[]>([]);

    const addToDo = ()=> {
        setToDoList([...toDoList, value]);
        setValue('');
    }

    // input 창에 값을 입력을 한다. 그리고 엔터키를 친다
    // input 창 아래에 새로운 div 가 추가된다.
    // 그리고 그 div 의 내용은 input 창에 입력한 값이 추가된다.
    return (

        <ToDoBlock>
            <h1>todo 리스트</h1>
            <InsertForm>
                <Input autoFocus onChange={(e)=>{setValue(e.target.value)}} value={value} placeholder="할 일을 입력하세요" />
                <button onClick={addToDo}>+</button>    
            </InsertForm>

            {
                toDoList.map((a,i)=>{
                    return (
                        ""
                    )
                })    
            }
            
            <ToDoItem toDoList={toDoList}/>
        </ToDoBlock>

    )
}