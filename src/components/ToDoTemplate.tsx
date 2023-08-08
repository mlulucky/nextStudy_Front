import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ToDoInsert from "./ToDoInsert";
import ToDoList from "./ToDoList";
import { useToDo } from "@/hooks/useToDo";
import ToDoHead from "./ToDoHead";

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

  return (
    <ToDoWrap>
      <ToDoHead state={state}/>      
      <ToDoInsert addToDo={addToDo}/>
      <ToDoList state={state} toggleToDo={toggleToDo} removeToDo={removeToDo} updateToDo={updateToDo}/>
    </ToDoWrap>

  );

}
