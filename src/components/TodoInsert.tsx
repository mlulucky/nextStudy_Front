import React, { FormEvent, useState, SetStateAction, Dispatch} from 'react'
import styled from "styled-components";
import Form from './Form';
import CheckBox from './CheckBox';
import Button from './Button';
import useAuth from '@/hooks/useAuth';
import useToDoService from '@/hooks/useToDoService';
import userStore from '@/store/userStore';
import ToDoCreateRequestDTO from '@/dto/ToDoCreateRequestDTO';

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
export default function ToDoInsert({addToDo} : {addToDo: (text: string) => void }) {
    const [value, setValue] = useState('');
    const {addToDoService} = useToDoService();
    const {user} = userStore();

   const data: ToDoCreateRequestDTO = {
    userId: user.id,
    content: value, // 입력한 값
    done: false // 기본 값
  }

    const 할일등록 = (e: FormEvent) => {
			e.preventDefault();
			if(value.trim() == "") { alert("할 일을 입력해주세요.") }  
      else {
        addToDoService(data);
        setValue(''); // 입력값 초기화
      }					 
		}

    return (
      <>
        <Form noneborder onSubmit={ 할일등록 } style={{flex: "1"}}>
					<Form.Input
            onChange={setValue}
            value={value}
            placeholder="할 일을 입력하고, Enter를 치세요"
          />
          <button style={{ display: "none" }} />
        </Form>
      </>
    );
}
