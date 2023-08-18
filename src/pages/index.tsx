import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import styled from 'styled-components'
import CheckBox from '@/components/CheckBox'
import checkImg from '@public/check.png'
import iconImg from '@public/icon.png'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { PageWrapper } from '@/styles/PageWrapper'
import Button from '@/components/Button'
import Form from '@/components/Form'

export default function Home() {
  const [connection, setConnection] = useState<string>('');
  const connectionTest = () => {
    axios.get('http://localhost:8080/api/user/hello')
    .then((response) => {
      console.log(response);
    }).catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=> { // 특정 상태가 변경시 실행
    connectionTest();
  },[]) // [] : 최초 렌더 시 1 번만 실행


  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  
  const loginHandler = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 페이지 새로고침 방지

    if(account.length === 0 || password.length === 0){
      alert("이메일과 비밀번호를 입력하세요.");
      // return;
    }
    
    const data = {
      account,
      password
    }

    axios.post('http://localhost:8080/api/user/login', data)  // { "key" : value } 서버로 전달할 데이터
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=> {
      alert("로그인에 실패했습니다.")
      console.log(error);
    });
  }


  return (
    <PageWrapper>
      <Form>
        <h3>Login</h3>
        <div style={{boxShadow: '0 2px 6px 0 rgba(68,68,68,.08)'}}>
          <Form.Input isfirst placeholder='아이디'  onChange={(e)=>{setAccount(e)}}/>
          <Form.Input placeholder='비밀번호'  onChange={(e)=>{setPassword(e)}}/>
        </div>
        <CheckBox/>
        <Button onClick={(e)=>{ loginHandler(e); }}>로그인</Button>
      </Form>
    </PageWrapper>
  )
}

