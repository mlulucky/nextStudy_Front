import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ToDoInsert from "./ToDoInsert"
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
  const [value, setValue] = useState('');
  const {state, addToDo, toggleToDo, removeToDo} = useToDo();

  return (
    <ToDoWrap>
      <ToDoHead state={state}/>      
      <ToDoInsert value={value} setValue={setValue} addToDo={addToDo}/>
      <ToDoList state={state} toggleToDo={toggleToDo} removeToDo={removeToDo}/>
    </ToDoWrap>

  );

}
