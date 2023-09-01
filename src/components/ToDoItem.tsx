import React, { FormEvent, useState } from "react";
import { styled, css } from "styled-components";
import { MdRemoveCircleOutline, MdEdit, MdDone, MdCheck, MdClose } from "react-icons/md";
import todoStore from "@/store/todoStore";
import ToDoDTO from "@/dto/ToDoDTO";
import useToDoService from "@/hooks/useToDoService";

// 할 일
export default function ToDoItem({todoProp} : {todoProp: ToDoDTO}) { // props 전달시, 객체 분해 할당 사용
  const [ showEdit, setShowEdit ] = useState(false);
  const [ value, setValue ] = useState(todoProp.content);
	const [todoValue, setTodoValue] = useState(todoProp);
  const { isDoneToDo, updateToDoList, removeToDoList } = todoStore();
	const { modifyToDoService, changeDoneService } = useToDoService();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() == "") {
      alert("할 일을 입력해주세요.");
    } else {
			const updateTodoProp = {...todoValue, content: value}; 
			setTodoValue(updateTodoProp); 
      modifyToDoService(updateTodoProp);
      setShowEdit(!showEdit);
    }
  };

  const changeDone = () => {
    const updateTodoProp ={...todoValue, done: !todoValue.done};
    setTodoValue(updateTodoProp);
    changeDoneService(updateTodoProp);

  }

  const onEdit = () => {
    setValue(todoProp.content);
    setShowEdit(!showEdit);
  };

  const onDelete = () => {
    removeToDoList(todoProp.id);
  };


  return (
    <List>
      <Check $done={todoValue.done} onClick={() => {changeDone();}}><MdDone /></Check>
      { !showEdit ? 
        ( <Div>
            <ToDo $done={todoValue.done} onClick={() => {changeDone();}}>{todoProp.content}</ToDo>
            <Edit onClick={onEdit}><MdEdit /></Edit>
            <Remove className="remove" onClick={onDelete}><MdRemoveCircleOutline /></Remove>
          </Div>
        ) : 
        ( <Form onSubmit={onSubmit}>
            <ToDoInput value={value} onChange={(e) => { setValue(e.target.value); }}/>
            <Register type="submit"><MdCheck /></Register>
            <Cancle onClick={(e) => { e.preventDefault(); setShowEdit(!showEdit); }}><MdClose /></Cancle>
          </Form>
        )}
    </List>
  );
}

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
`;
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
`;

const Check = styled.span<{ $done: boolean }>`
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
  ${(props) =>
    props.$done &&
    css`
      border: 1px solid #03c75a;
      background-color: #03c75a;
      color: #fff;
    `}
`;

const ToDo = styled.div<{ $done: boolean }>`
  ${commonStlye};
  ${(props) =>
    props.$done &&
    css`
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
`;