import React, { useEffect } from "react";
import styled from "styled-components";
import ToDoInsert from "./TodoInsert";
import ToDoList from "./ToDoList";
import useToDoService from "@/hooks/useToDoService";
import ToDoHead from "./ToDoHead";
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
  const { getToDos } = useToDoService();
	const [cookies, setCookies] = useCookies();
	const refreshTokenCheck = async () => {
		const refreshToken = cookies.refreshToken;
		// 브라우저에 refreshToken 이 있으면 accesstoken 재발급
	}
  useEffect(() => {
    getToDos();
		// 로그인체크
  }, []);
	
  return (
    <>
      <ToDoWrap>
        <ToDoHead/>
        <ToDoInsert/>
        <ToDoList/>
      </ToDoWrap>
    </>
  );
}
