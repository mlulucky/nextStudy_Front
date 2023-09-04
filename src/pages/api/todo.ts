import ToDoCreateRequestDTO from "@/dto/ToDoCreateRequestDTO";
import ToDoDTO from "@/dto/ToDoDTO";
import axios, { AxiosInstance } from "axios";
import { toDoHttpRequest } from "./axiosWithToken";

// get-조회 / post-등록 / patch-수정 / delete-삭제
export const getListAPI = async (token: string, userId: number) => {
  // await - 비동기 작업이 완료될때 까지 기다린다.
  try {
    const listResponse = await toDoHttpRequest(token).get(`/${userId}/list`);
    return listResponse.data;
  } catch (error) {
    console.log("응답데이터가 없습니다.");
    console.error(error);
    return null;
  }
};

export const addAPI = async (token: string, data: ToDoCreateRequestDTO) => {
  const addResponse = await toDoHttpRequest(token)
    .post(`/register`, data)
    .catch((error) => {
      console.error(error);
      null;
    }); // request 요청 실패시 -> catch 문 실행, addResponse 에 null 할당
  if (!addResponse) {
    alert("응답데이터가 없습니다.");
    return null;
  } // addResponse 가 null 인지 체크
  return addResponse.data;
};

export const modifyAPI = async (token: string, data: ToDoDTO) => {
  try {
    const modifyResponse = await toDoHttpRequest(token).patch(`/modify`, data);
    return modifyResponse.data; // {id: content: done: }
  } catch (error) {
    console.log("응답데이터가 없습니다.");
    console.error(error);
    return null;
  }
};

export const deleteAPI = async (token: string, todoId: number) => {
  try {
    const deleteResponse = await toDoHttpRequest(token).delete(
      `/${todoId}/delete`
    );
    if (deleteResponse.status === 200) {
      return true;
    } else {
      console.error("응답에 실패했습니다.");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
