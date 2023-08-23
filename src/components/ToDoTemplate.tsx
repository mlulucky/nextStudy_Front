import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import ToDoInsert from "./ToDoInsert";
import ToDoList from "./ToDoList";
import { useToDo } from "@/hooks/useToDo";
import ToDoHead from "./ToDoHead";
import { addToDoAPI } from "@/pages/api/todo";
import userStore from "@/store/userStore";
import axios from "axios";
import { responsiveFontSizes } from "@mui/material";
import { useCookies } from "react-cookie";

const ToDoWrap = styled.div`
  border: 1px solid #c6c6c6;
  width: 450px;
  height: 500px;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

export default function ToDoTemplate() {
  const {state, addToDo, toggleToDo, removeToDo, updateToDo} = useToDo();

  const {user, setUser} = userStore();
  const [cookies, setCookies] = useCookies();

  type ToDos = {
    id: number;
    content: string;
    done: boolean;
  }

  const [todoList, setTodoList] = useState<ToDos[]>([]); // 제네릭에 ToDos[] 타입을 지정 -> [] 빈배열도 ToDos[] 로 정의됨 // 👀 todoList 타입 제네릭 설정하기

  // const getToDoList = async (token: string) => {
  //   const requestToken = {
  //     headers: {
  //       Authorization: `Bearer ${token}` // 쿠키에서 토큰을 가져와서 헤더에 포함
  //     }
  //   }

  //   await axios.get(`/api/todo/${user.id}/list`, requestToken)
  //   .then((response) => {
  //     setTodoList(response.data);
  //   }).catch((error) => {
  //     console.log("getToDo Error", error);
  //   })

  //   console.log("todoList",todoList);

  // }

  useEffect(()=>{
    const token = cookies.token;
    if(token) getToDoList(token);
  },[]);


  return (
    <>
      { todoList.map((todo, i)=>{
        return (
          <>
            {todo.content}
          </>
        )
      }) }
      <ToDoWrap>
        <ToDoHead state={state}/>      
        <ToDoInsert addToDo={addToDo}/>
        <ToDoList state={state} toggleToDo={toggleToDo} removeToDo={removeToDo} updateToDo={updateToDo}/>
      </ToDoWrap>
    </>
  );

}
