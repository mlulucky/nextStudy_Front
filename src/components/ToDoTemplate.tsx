import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ToDoInsert from "./ToDoInsert"
import ToDoList from "./ToDoList";
import { useToDo } from "@/modules/todos";

const ToDoBlock = styled.div`
  border: 1px solid #c6c6c6;
  width: 450px;
  height : 500px;
  border-radius: 10px;
`;


export default function ToDoTemplate() {


  return (
    <ToDoBlock>
      <h1>todo 리스트</h1>
      <ToDoInsert/>
      <ToDoList />
    </ToDoBlock>

  );

}
