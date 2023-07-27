import React from "react";
import styled from "styled-components";
import ToDoTemplate from "@/components/ToDoTemplate";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

export default function ToDoListPage() {
  return (
    <Div>
      <ToDoTemplate></ToDoTemplate>
    </Div>
  );
}
