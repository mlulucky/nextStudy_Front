import React, { useEffect } from "react";
import styled from "styled-components";
import ToDoInsert from "./TodoInsert";
import ToDoList from "./ToDoList";
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
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export default function ToDoTemplate() {
  const { getToDos } = useToDoService();

  useEffect(() => {
    getToDos();
  }, []);
	
  return (
    <>
      <ToDoWrap>
        <ToDoHead/>
        <ToDoInsert/>
        <ToDoList/>
      </ToDoWrap>
    </>
  );
}
