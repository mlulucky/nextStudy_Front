import React, { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import ToDoInsert from "./TodoInsert";
import ToDoList from "./ToDoList";
import { useToDo } from "@/hooks/reducer/useToDo";
import useToDoService from "@/hooks/useToDoService";
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
  const { state, toggleToDo, removeToDo, updateToDo } = useToDo();
  const { getToDos } = useToDoService();

  useEffect(() => {
    getToDos();
  }, []);

  return (
    <>
      <ToDoWrap>
        <ToDoHead state={state} />
        <ToDoInsert/>
        <ToDoList/>
      </ToDoWrap>
    </>
  );
}
