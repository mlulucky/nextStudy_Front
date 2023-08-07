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

const Div = styled.div<{done: boolean}>`
	flex: 1;
	display: flex;
	align-items: center;
	${props => props.done && css`
		${Check} {
			border: 1px solid #03c75a;
			background-color: #03c75a;
			color: #fff;
		}
		${ToDo} {
			text-decoration: line-through;
			color: gray;
		}
	`}    
`;

const Check = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 1px solid #ced4da;
	color: #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;

const ToDo = styled.div` 
	flex: 1;
	text-align: left;
  display: flex;
  align-items: center;
`;

// 할 일
export default function ToDoItem({todo, toggleToDo, removeToDo}: {todo : ToDos, toggleToDo: toggleRmoveType['toggleToDo'], removeToDo: toggleRmoveType['removeToDo']}) { 
  return(
    <List>
      <Div done={todo.done} onClick={()=>{toggleToDo(todo.id)}}>
        <Check> <MdDone/> </Check>
        <ToDo>{todo.todo}</ToDo>
      </Div>
      <Remove className="remove" onClick={()=>{removeToDo(todo.id)}} > <MdRemoveCircleOutline /> </Remove>
    </List>

  )
}
