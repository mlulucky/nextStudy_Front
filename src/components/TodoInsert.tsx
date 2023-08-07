import React, { FormEvent, useState, SetStateAction, Dispatch} from 'react'
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

// React.Dispatch<React.SetStateAction<state의 타입>>; - setValue 는 Dispatch 타입

// 할 일 등록 컴포넌트
export default function ToDoInsert({value, setValue, addToDo} : {value: string, setValue: Dispatch<SetStateAction<string>>, addToDo: (text: string) => void }) {
		const onSubmit = (e: FormEvent) => {
			e.preventDefault();
			if(value.trim() == "") { alert("할 일을 입력해주세요.") }  
      else {
        addToDo(value);
        setValue("");
      }					 
		}

    return (
        <form onSubmit={ onSubmit } style={{flex: "1"}}>
					<Input
            autoFocus
            onChange={(e) => { setValue(e.target.value); }}
            value={value}
            placeholder="할 일을 입력하고, Enter를 치세요"
          />
          <button style={{ display: "none" }} />
        </form>
    );
}