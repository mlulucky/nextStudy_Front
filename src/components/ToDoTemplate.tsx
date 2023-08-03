import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ToDoItem from "./ToDoItem";
import ToDoList from "./ToDoList";

const ToDoBlock = styled.div`
  border: 1px solid #c6c6c6;
  width: 450px;
  border-radius: 10px;
`;

const InsertForm = styled.form`
  padding: 30px;
  height: 400px;
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
  &:focus {
    border: 1px solid #03c75a;
  }
  &::placeholder {
    color: #ccc;
  }
`;

export default function ToDoTemplate() {
  const [value, setValue] = useState<string>("");
  const [toDoList, setToDoList] = useState<string[]>([]);
  const [done, setDone] = useState<boolean>(false);


  const addToDo = () => {
    setToDoList([...toDoList, value]); // 🌈 구현 바뀔 예정
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
              if(value.trim() == "") {
                alert("할 일을 입력해주세요.");
              } else {
                addToDo();
              }
            }}
          >
          </button>
        </div>
        <ToDoList />
        {/* <ToDoItem done={done} setDone={setDone} toDoList={toDoList} setToDoList={setToDoList}/> */}
      </InsertForm>
    </ToDoBlock>

  );

}
