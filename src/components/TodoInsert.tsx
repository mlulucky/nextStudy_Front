import React, { FormEvent, useState } from "react";
import Form from "./Form";
import useToDoService from "@/hooks/useToDoService";
import userStore from "@/store/userStore";
import ToDoCreateRequestDTO from "@/dto/ToDoCreateRequestDTO";

// 할 일 등록 컴포넌트
export default function ToDoInsert() {
  const [value, setValue] = useState("");
  const { addToDoService } = useToDoService();
  const { user } = userStore();

  const data: ToDoCreateRequestDTO = {
    userId: user.id,
    content: value, // 입력한 값
    done: false, // 기본 값
  };

  const 할일등록 = (e: FormEvent) => {
    e.preventDefault();

    if (value.trim() == "") {
      alert("할 일을 입력해주세요.");
    } else {
      addToDoService(data); // useToDoService 에서 addToDoList 로 todo 추가(todo 상태를 변경(todo 상태 store 에서 관리(전역 동기화)) -> 렌더링 화면반영됨
      setValue(""); // 입력값 초기화
    }
  };

  return (
    <>
      <Form noneborder onSubmit={할일등록} style={{ flex: "1" }}>
        <Form.Input
          style={{ borderRadius: "6px 6px 6px 6px" }}
          placeholder="할 일을 입력하고, Enter를 치세요"
          onChange={setValue}
          value={value}
        />
        <button style={{ display: "none" }} />
      </Form>
    </>
  );
}
