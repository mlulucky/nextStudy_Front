import React from "react";
import {styled, css} from "styled-components";
import ToDoItem from './ToDoItem';
import useToDo from "@/hooks/useToDo";
// import useToDo from "@/modules/todos";

const Ul = styled.ul`
  padding-left: 0 !important;
  border: 2px solid green;
	flex: 3;
  overflow-y: auto;
`;

export default function ToDoList() {
   // const todos : { id: number; todo: string; done: boolean; }[] = []; // 🌈
    const todos = useToDo();


   if(todos.length === 0) return <p>등록된 항목이 없습니다.</p>

   return (
    <Ul>
        {
            todos.map( (todo, i) => {return (
                <ToDoItem todo={todo} key={i}/>
            )} )
        }
    </Ul>
   )
}


