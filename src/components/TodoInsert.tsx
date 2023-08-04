import React, { FormEvent, useState } from 'react'
import styled from "styled-components";
import { useToDo } from "@/modules/todos"

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 90%;
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

// 할 일 등록 컴포넌트
export default function ToDoInsert() {
    const [value, setValue] = useState('');
    const { addToDo } = useToDo();

		const onSubmit = (e: FormEvent) => {
			e.preventDefault();
			if(value.trim() == "") { alert("할 일을 입력해주세요.") }  
      else {
        addToDo(value);
        setValue("");
        console.log("submit");
      }					 
		}

    return (
        <form onSubmit={ onSubmit }>
					<Input
            autoFocus
            onChange={(e) => { setValue(e.target.value); }}
            value={value}
            placeholder="할 일을 입력하고, Enter를 치세요"
          />
          <button
            style={{ display: "none" }}
          >
          </button>
        </form>
    );
}