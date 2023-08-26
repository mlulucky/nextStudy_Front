import React from "react";
import { styled } from "styled-components";
import ToDoItem from "./ToDoItem";
import todoStore from "@/store/todoStore";

const Ul = styled.ul`
  // border: 2px solid green;
  overflow-y: auto;
  list-style: none;
  padding-left: 0 !important;
  padding: 0 1rem;
  flex: 4;
`;

export default React.memo(function ToDoList() {
  const { todos } = todoStore();

  if (todos.length === 0) return <p style={{ flex: "4" }}>등록된 항목이 없습니다.</p>;   
  return (
    <Ul>
      {todos.map((todo, i) => {
        return (
          <ToDoItem todoProp={todo}/>
        );
      })}
    </Ul>
  );
});
