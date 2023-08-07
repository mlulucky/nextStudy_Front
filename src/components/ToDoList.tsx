import React from "react";
import { styled } from "styled-components";
import ToDoItem from './ToDoItem';
import { ToDoItemType } from "@/hooks/useToDo";

const Ul = styled.ul`
  // border: 2px solid green;
  overflow-y: auto;
  list-style: none;
  padding-left: 0 !important;
  padding: 0 1rem; 
  flex: 4;
`;

export type toggleRmoveType = {
  toggleToDo : (id:number)=> void;
  removeToDo: (id:number)=>void
}

export default React.memo(
  function ToDoList({ state, toggleToDo, removeToDo } : {state: ToDoItemType, toggleToDo: toggleRmoveType['toggleToDo'], removeToDo: toggleRmoveType['removeToDo'] } ) {

    if (state.todos.length === 0) return <p style={{flex: "4"}}>등록된 항목이 없습니다.</p>;
  
    console.log("todolist state", state);
    return (
      <Ul>
        {
        state.todos.map((todo, i) => {
          return <ToDoItem todo={todo} key={i} toggleToDo={toggleToDo} removeToDo={removeToDo}/>;
        })
        }
      </Ul>
    );
  }
)

