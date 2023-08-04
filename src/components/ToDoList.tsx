import React from "react";
import {styled, css} from "styled-components";
import ToDoItem from './ToDoItem';
import { useToDo } from "@/modules/todos";

const Ul = styled.ul`
  border: 2px solid green;
	// flex: 3;
  // overflow-y: auto;
  list-style: none;
  padding-left: 0 !important;

`;

export default function ToDoList() {
  const { state } = useToDo();

  if (state.length === 0) return <p>등록된 항목이 없습니다.</p>;

  console.log("todolist state", state);
  return (
    <Ul>
      {
      state.map((todo, i) => {
        return <ToDoItem todo={todo} key={i} />;
      })
      }

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </Ul>
  );
}


