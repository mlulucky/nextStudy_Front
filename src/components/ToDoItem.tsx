import React, { FormEvent, useState } from "react";
import {styled, css} from "styled-components";
import { MdRemoveCircleOutline, MdEdit, MdDone, MdCheck, MdClose } from 'react-icons/md';
import { BiEdit } from "react-icons/bi";
import { useToDo, ToDos } from "@/hooks/reducer/useToDo"; 
import { ToDoListProps } from "./ToDoList";

const commonStlye = css`
  flex: 1;
  text-align: left;
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const commonLeftStyle = css`
  font-size: 20px;
  color: #dee2e6;
  cursor: pointer;
  margin-right: 5px;
`;

const commonRightStyle = css`
  font-size: 24px;
  color: #dee2e6;
  cursor: pointer;
`;

const commonWrapStyle = css`
  flex: 1;
  display: flex;
  align-items: center;  
`
const Remove = styled.span`
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  visibility: hidden;
`;

const Edit = styled.span`
    ${commonLeftStyle};
    &:hover {
      color: #03c75a;
    };
    visibility: hidden;
`;

const List = styled.li`
	padding: 10px 0;
  display: flex;
  align-items: center;
	&:hover {
		${Remove} { 
			visibility: visible;
    }
    ${Edit} { 
			visibility: visible;
    }
  }
`;

const Div = styled.div`
	${commonWrapStyle}
`;

const Form = styled.form`
  ${commonWrapStyle}
`

const Check = styled.span<{done: boolean}>`
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
  position: relative;
  bottom: -2px;
  ${props => props.done && css`
    border: 1px solid #03c75a;
    background-color: #03c75a;
    color: #fff;
  `}
`;

const ToDo = styled.div<{done: boolean}>` 
  ${commonStlye};
  ${props => props.done && css`
    text-decoration: line-through;
    color: gray;
  `}
`;

const ToDoInput = styled.input`
  ${commonStlye};
  position: relative;
  bottom: -3px;
  left: -2px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  &:focus {
    border-bottom: 1px solid #03c75a;
  }
`;

const Register = styled.button`
  ${commonLeftStyle};
  border: none;
  background-color: transparent; 
  padding: 0; 
  line-height: 100%;
  &:hover {
    color: #03c75a;
  }
`;

const Cancle = styled.button`
  ${commonRightStyle};
  border: none;
  background-color: transparent; 
  padding: 0;
  line-height: 100%;
  &:hover {
    color: #ff6b6b;
  }
`

// 할 일
export default function ToDoItem({todo, toggleToDo, removeToDo, updateToDo}: {todo : ToDos, toggleToDo: ToDoListProps['toggleToDo'], removeToDo: ToDoListProps['removeToDo'], updateToDo: ToDoListProps['updateToDo']}) { 
  const [showEdit, setShowEdit] = useState(false);
  const [value, setValue] = useState(todo.todo);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(value.trim() == "") { alert("할 일을 입력해주세요.") }
    else {
      updateToDo(value, todo.id);
      setShowEdit(!showEdit)
    }
  }

  const onEdit = () => {
    setValue(todo.todo); 
    setShowEdit(!showEdit);
  }

  const onDelete = () => {
    removeToDo(todo.id);
  }

  return(
    <List>
      <Check done={todo.done} onClick={()=>{toggleToDo(todo.id)}}> <MdDone/> </Check>
      
      {
        !showEdit ? 
        <Div>
          <ToDo done={todo.done} onClick={()=>{toggleToDo(todo.id)}}> {todo.todo} </ToDo> 
          <Edit onClick={ onEdit }> <MdEdit/> </Edit>
          <Remove className="remove" onClick={ onDelete } > <MdRemoveCircleOutline /> </Remove>
        </Div>
        : 
        <Form onSubmit={ onSubmit }>
          <ToDoInput value={value} onChange={(e)=> { setValue(e.target.value) }}></ToDoInput>
          <Register type="submit"> <MdCheck/> </Register>
          <Cancle onClick={(e)=> { e.preventDefault(); setShowEdit(!showEdit) }}> <MdClose/> </Cancle>
        </Form>
      }
    </List>

  )
}
