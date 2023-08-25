import React, { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import ToDoInsert from "./TodoInsert";
import ToDoList from "./ToDoList";
import { useToDo } from "@/hooks/reducer/useToDo";
import useToDoService from "@/hooks/useToDoService";
import ToDoHead from "./ToDoHead";
import todoStore from "@/store/todoStore";

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
  
  useEffect(()=>{
    getToDos();
  },[]);

  return (
    <>
      {
        todos.map((todo,i)=> {
          return (
            <span key={i}>{todo.content}</span>
          );
        })
      }
      <ToDoWrap>
        <ToDoHead state={state}/>      
        <ToDoInsert addToDo={addToDo}/>
        <ToDoList state={state} toggleToDo={toggleToDo} removeToDo={removeToDo} updateToDo={updateToDo}/>
      </ToDoWrap>
    </>
  );

}
