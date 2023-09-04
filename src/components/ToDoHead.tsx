import { ToDoItemType } from "@/hooks/reducer/useToDo";
import todoStore from "@/store/todoStore";
import React from "react";

export default function ToDoHead() {
  const today = new Date();
  const dateName = today.toLocaleDateString("ko-KR", {
    year: "numeric",
		month: "long",
		day: "numeric"
  });
	const dayName = today.toLocaleDateString("ko-KR", {weekday: "long"});

	const {todos} = todoStore();
	const undoneTasks = todos.filter((todo)=> !todo.done); // to.done 이 false 인 todo 배열

  return (
    <div style={{ textAlign: "left", flex: "1" }}>
      <h1 style={{ margin: "0px" }}>{dateName}</h1>
      <span>{dayName}</span>
      <p>할일 {undoneTasks.length}개</p>
    </div>
  );
}
