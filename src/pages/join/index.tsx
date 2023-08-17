import React, { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function Join(){
    const [requestResult, setRequestResult] = useState<string>('');
    const [account, setAccount] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');

    const joinHandler = () => {
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
    }

    return (
        <Box>
             <TextField fullWidth id="standard-basic" label="계정" variant="standard" onChange={(e)=> setAccount(e.target.value)}/>
             <TextField fullWidth id="standard-basic" label="이름" variant="standard" onChange={(e) => setUserName(e.target.value)}/>
             <TextField fullWidth id="standard-basic" label="이메일" variant="standard" onChange={(e)=> setEmail(e.target.value)}/>
             <TextField fullWidth id="standard-basic" label="비밀번호" type="password" variant="standard" onChange={(e)=> setPassword(e.target.value)}/>
             <TextField fullWidth id="standard-basic" label="비밀번호확인" type="password" variant="standard" onChange={(e)=> setPasswordCheck(e.target.value)}/>
            {requestResult}
            <button onClick={()=>{ joinHandler(); }}>회원가입</button>
        </Box>
    )
}