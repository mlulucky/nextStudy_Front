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
  const [userId, setUserId] = useState<number>();
  const [content, setContent] = useState<string>();
  const [done, setDone] = useState<boolean>();
  const [cookies, setCookies] = useCookies();

  // id
  // userId
  // content
  // done

  const [todoList, setTodoList] = useState([]); // 👀 todoList 타입 제네릭 설정하기

  const todoCreateHandler = async () => {
    const data = {
      // account : 
      userId,
      content,
      done
    }
    
    const toDoResponse = await addToDoAPI(data);


  }

  const getToDoList = async (token: string) => {
    const requestToken = {
      headers: {
        Authorization: `Bearer ${token}` // 쿠키에서 토큰을 가져와서 헤더에 포함
      }
    }

    await axios.get(`/api/todo/${user.id}/list`, requestToken)
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log("getToDo Error", error);
    })
  }

  useEffect(()=>{
    const token = cookies.token;
    if(token) getToDoList(token);
  },[]);


  return (
    <ToDoWrap>
      <ToDoHead state={state}/>      
      <ToDoInsert addToDo={addToDo}/>
      <ToDoList state={state} toggleToDo={toggleToDo} removeToDo={removeToDo} updateToDo={updateToDo}/>
    </ToDoWrap>
  );

}
