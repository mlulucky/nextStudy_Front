import React, { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Form from '@/components/Form'
import Button from '@/components/Button';
import { PageWrapper } from '@/styles/PageWrapper';

export default function Join(){
    const [requestResult, setRequestResult] = useState<string>('');
    const [account, setAccount] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');

    const joinHandler = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = {
            account,
            userName,
            email,
            password,
            passwordCheck
        };

        axios.post("http://localhost:8080/api/user/join", data) // axios.post(url, data) : post 방식으로 url 에 data 전달 - request body에 전달할 data(json)
        .then((response)=>{
            console.log(response);
            setRequestResult('성공');
        }).catch((error)=> {
            setRequestResult('에러');
            console.log(error);
        })

        if(!account) {
            alert("계정을 입력해주세요");
        }

    }

    return (
			<PageWrapper>
				<Box >
						{requestResult}
				</Box>
				<Form>
					<h3>회원가입</h3>
					<Form.Input placeholder="계정" onChange={(e)=>{setAccount(e)}}/>
					<Form.Input placeholder="이름" onChange={(e)=>{setUserName(e)}}/>
					<Form.Input placeholder="이메일" onChange={(e)=>{setEmail(e)}}/>
					<Form.Input placeholder="비밀번호" onChange={(e)=>{setPassword(e)}}/>
					<Form.Input placeholder="비밀번호확인" onChange={(e)=>{setPasswordCheck(e)}}/>
					<Button onClick={(e)=>{ joinHandler(e); }}>가입하기</Button>
				</Form>
			</PageWrapper>
    )
}