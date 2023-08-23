import React, { useState } from 'react'
import Form from '@/components/Form'
import Button from '@/components/Button';
import { PageWrapper } from '@/styles/PageWrapper';
import useAuth from '@/hooks/useAuth';


export default function Join(){
    const [account, setAccount] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const { userJoin } = useAuth();

    const joinHandler = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = {
            account, // account : account // setAccount() 사용하여 입력한 값을 account 로 저장 -> api 로 서버에 data 전달예정
            userName,
            email,
            password,
            passwordCheck
        };
        userJoin(data); // 회원가입 hook(joinAPI + 회원가입로직)
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