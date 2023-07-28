import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ToDoItem from "./ToDoItem";

const ToDoBlock = styled.div`
  border: 1px solid red;
  width: 500px;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding: 30px;
  height: 600px;
  
  display: flex;
  flex-direction: column;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

export default function ToDoTemplate() {
  const [value, setValue] = useState<string>("");
  const [toDoList, setToDoList] = useState<string[]>([]);

  const addToDo = () => {
    setToDoList([...toDoList, value]);
    setValue("");
    console.log(toDoList);
  };

  // input 창에 값을 입력을 한다. 그리고 엔터키를 친다
  // input 창 아래에 새로운 div 가 추가된다.
  // 그리고 그 div 의 내용은 input 창에 입력한 값이 추가된다.
  return (

    <ToDoBlock>
      <h1>todo 리스트</h1>

      <InsertForm>
        <div>
          <Input
            autoFocus
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            placeholder="할 일을 입력하고, Enter를 치세요"
          />
          <button
            style={{ display: "none" }}
            onClick={(e) => {
              e.preventDefault();
              addToDo();
            }}
          >
          </button>
        </div>
        <ToDoItem toDoList = { toDoList }/>
      </InsertForm>
    </ToDoBlock>

  );

}
