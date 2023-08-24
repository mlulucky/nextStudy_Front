import React, { FormEvent, useState, SetStateAction, Dispatch} from 'react'
import styled from "styled-components";
import Form from './Form';
import CheckBox from './CheckBox';
import Button from './Button';
import useAuth from '@/hooks/useAuth';

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
export default function ToDoInsert({addToDo} : {addToDo: (text: string) => void }) {
    const [value, setValue] = useState('');
    const [account, setAccount] = useState<string>(""); // useState 안에있는 배열의 요소 순서대로 account, setAccount 변수에 대입
    const [password, setPassword] = useState<string>("");
    const { userLogin } = useAuth(); // 함수에 반환값 타입을 설정했으므로 타입스크립트가 반환된 타입으로 타입추론예정(제네릭x)

    const data = {
      account,  // account : account // key 와 value 의 이름이 같은 경우 값을 하나만 적어도 적용된다. // request dto 의 필드명과 이름이 같아야 한다.
      password  
    }
    const loginHandler = async (e: React.MouseEvent<HTMLButtonElement>) => { // e : 여기서는 onClick 클릭이벤트 타입
      e.preventDefault(); // 페이지 새로고침 방지
      userLogin(data); // 로그인 hook(loginAPI + 로그인로직)   
    }


    const onSubmit = (e: FormEvent) => {
			e.preventDefault();
			if(value.trim() == "") { alert("할 일을 입력해주세요.") }  
      else {
        addToDo(value);
        setValue("");
      }					 
		}

    return (
      <>
        <Form noneborder onSubmit={ onSubmit } style={{flex: "1"}}>
					<Form.Input
            onChange={setValue}
            value={value}
            placeholder="할 일을 입력하고, Enter를 치세요"
          />
          <button style={{ display: "none" }} />
        </Form>


        {/* <form onSubmit={ onSubmit } style={{flex: "1"}}>
					<Input
            autoFocus
            onChange={(e) => { setValue(e.target.value); }}
            value={value}
            placeholder="할 일을 입력하고, Enter를 치세요"
          />
          <button style={{ display: "none" }} />
        </form> */}
      
      </>
      
    );
}
