import React, { useState } from 'react'
import Form from '@/components/Form'
import Button from '@/components/Button';
import { PageWrapper } from '@/styles/PageWrapper';
import { joinAPI } from '../api/auth';

export default function Join(){
    const [account, setAccount] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');

    const joinHandler = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = {
            account,
            userName,
            email,
            password,
            passwordCheck
        };

        const joinResponse = await joinAPI(data);
        if(!joinResponse) {
            alert('회원가입에 실패했습니다.');
            return;
        }
        if(!joinResponse.result) {
            alert('회원가입에 실패했습니다.');
            return;
        }

        alert("회원가입에 성공했습니다.");
    
    }

    return (
			<PageWrapper>
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