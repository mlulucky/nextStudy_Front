import React, { FormEvent, useState } from 'react'
import styled from "styled-components";

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

// 할 일 등록 컴포넌트
export default function TodoInsert() {
    const [value, setValue] = useState('');
		const [toDoList, setToDoList] = useState<string[]>([]);

		const addToDo = () => {
			setToDoList([...toDoList, value]); // 🌈 구현 바뀔 예정
			setValue("");
			console.log(toDoList);
		};

		const onSubmit = (e: FormEvent) => {
			e.preventDefault();
			if(value.trim() == "") { alert("할 일을 입력해주세요.") }  
			addToDo();
			 
		}

    return (
        <form onSubmit={ onSubmit }>
					<Input
            autoFocus
            onChange={(e) => { setValue(e.target.value); }}
            value={value}
            placeholder="할 일을 입력하고, Enter를 치세요"
          />
          <button type="submit"
            style={{ display: "none" }}
          >
          </button>
        </form>
    );
}