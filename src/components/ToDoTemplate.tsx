import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ToDoInsert from "./ToDoInsert";
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
    //content: string; // 입력한 값
    done: false // 기본 값
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
      <Form style={{height: '500px'}}>
        <ToDoHead state={state}/>      
        {/* <Form.Input addToDo={addToDoService(data)}/> */}
        <ToDoList state={state} toggleToDo={toggleToDo} removeToDo={removeToDo} updateToDo={updateToDo}/>
      </Form>
      {/* <ToDoWrap>
        <ToDoHead state={state}/>      
        <ToDoInsert addToDo={addToDo}/>
        <ToDoList state={state} toggleToDo={toggleToDo} removeToDo={removeToDo} updateToDo={updateToDo}/>
      </ToDoWrap> */}
    </>
  );

}
