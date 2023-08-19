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

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => { // e : 여기서는 onClick 클릭이벤트 타입
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
    <Div>
      <Form>
        <Title>Login</Title>
        <div style={{boxShadow: '0 2px 6px 0 rgba(68,68,68,.08)'}}>
          <Input isFirst placeholder='아이디' onChange={(e)=> {setAccount(e.target.value)}}/>
          <Input placeholder='비밀번호' type="password" onChange={(e)=> {setPassword(e.target.value)}}/>
        </div>
        <CheckBox/>
        <Button onClick={(e)=>{
          loginHandler(e);
        }}>로그인</Button>
      </Form>
    </Div>
  )
}

// 스타일컴포넌트 정의 - 컴포넌트 외부로 이동 : 해당 컴포넌트가 렌더링될 때마다 스타일 컴포넌트가 다시 생성되지 않도록 합니다.
const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  `;

  const Form = styled.form`
    border: 1px solid #c6c6c6;
    width: 450px;
    height: 300px;
    padding: 20px 30px;
    border-radius: 10px;
  `;

  const Title = styled.h3`
  `;

  const Button = styled.button`
    width: 100%;
    border-radius: 6px;
    border: solid 1px rgba(0,0,0,.15);
    background-color: #03c75a;
    box-sizing: border-box;
    padding: 13px 0 13px;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: #fff;
    cursor: pointer;
    margin-top: 40px;
  `;

  // styled-components 에 props 속성 주기
  const Input = styled.input<{isFirst?:boolean}>`
    width: 100%;
    box-sizing: border-box;
    padding: 14px 17px 13px;
    border: 1px solid #dadada;
    margin-top: ${({isFirst}) => isFirst ? '0' : '-1px'};
    border-radius: ${({isFirst}) => isFirst ? '6px 6px 0 0' : '0 0 6px 6px'};
    position: relative;
    &:focus {
      border: 1px solid #03c75a;
      outline: none;
      z-index: 5;
    }
  `;
  
