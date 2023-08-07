import React from "react";
import {styled, css} from "styled-components";
import { MdDone, MdRemoveCircleOutline } from 'react-icons/md';
import { useToDo, ToDos } from "@/hooks/useToDo"; 
import { toggleRmoveType } from "./ToDoList";

const Remove = styled.div`
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  visibility: hidden;

`; 

const List = styled.li`
	padding: 10px 0;
  display: flex;
  align-items: center;
	&:hover {
		${Remove} { 
			visibility: visible;
`;

const ToDo = styled.div<{ done: boolean }>` // 태그 props 타입
	flex: 1;
	text-align: left;
  ${props =>
    props.done && css`
      text-decoration: line-through;
      color: gray;
    `}
`
const Check = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`

// 할 일
export default function ToDoItem({todo, toggleToDo, removeToDo}: {todo : ToDos, toggleToDo: toggleRmoveType['toggleToDo'], removeToDo: toggleRmoveType['removeToDo']}) { 
  return(
    <List>
      <Check>  <MdDone/> </Check>
      <ToDo done={todo.done} onClick={ ()=> {toggleToDo(todo.id)} }>{todo.todo}</ToDo>
      <Remove className="remove" onClick={ () => { removeToDo(todo.id)} } > <MdRemoveCircleOutline /> </Remove>
    </List>

  )
}
