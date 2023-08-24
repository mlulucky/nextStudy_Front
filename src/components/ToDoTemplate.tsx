import React, { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import ToDoInsert from "./TodoInsert";
import ToDoList from "./ToDoList";
import { useToDo } from "@/hooks/reducer/useToDo";
import useToDoService from "@/hooks/useToDoService";
import ToDoHead from "./ToDoHead";
import todoStore from "@/store/todoStore";
import Form from "./Form";
import userStore from "@/store/userStore";

const ToDoWrap = styled.div`
  border: 1px solid #c6c6c6;
  width: 450px;
  height: 500px;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

export default function ToDoTemplate() {
  const {state, addToDo, toggleToDo, removeToDo, updateToDo} = useToDo();
  const {getToDos, addToDoService} = useToDoService();
  const {todos} = todoStore();
  const [value, setValue] = useState('');
  const {user} = userStore();
  

  useEffect(()=>{
    getToDos();
  },[]);

  const data = {
    userId: user.id,
    content: value, // 입력한 값
    done: false // 기본 값
  }

  const 할일등록 = (e: FormEvent) => {
    e.preventDefault();
    if(value.trim() == "") { alert("할 일을 입력해주세요.") } 
    else {
      addToDoService(data);
      setValue(''); // 입력값 초기화
    }
  
  
  }

  return (
    <>
      {
        todos.map((todo,i)=> {
          return (
            <span key={i}>{todo.content}</span>
          );
        })
      }
      {/* <Form onSubmit={할일등록} style={{height: '500px'}}>
        <ToDoHead state={state}/>      
        <Form.Input placeholder="할 일을 입력하고, Enter를 치세요" onChange={setValue} />
        <ToDoList state={state} toggleToDo={toggleToDo} removeToDo={removeToDo} updateToDo={updateToDo}/>
        <button style={{ display: "none" }} />
      </Form> */}
      <ToDoWrap>
        <ToDoHead state={state}/>      
        <ToDoInsert addToDo={addToDo}/>
        <ToDoList state={state} toggleToDo={toggleToDo} removeToDo={removeToDo} updateToDo={updateToDo}/>
      </ToDoWrap>
    </>
  );

}
