import React from "react";
import styled from "styled-components";
import ToDoTemplate from "@/components/ToDoTemplate";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
`;

export default function ToDoListPage() {
  return (
    <Div>
      <ToDoTemplate></ToDoTemplate>
    </Div>
  );
}
