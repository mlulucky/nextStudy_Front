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
import { useCookies } from 'react-cookie'
import userStore from '@/store/userStore'

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

  const [account, setAccount] = useState<string>(""); // useState 안에있는 배열의 요소 순서대로 account, setAccount 변수에 대입
  const [password, setPassword] = useState<string>("");
  const [cookies, setCookies] = useCookies(); 
  const {user, setUser} = userStore(); // userStore 안에 있는 setUser 와 동일한 속성명의 속성을 대입한다. - 객체 구조분해할당  


  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => { // e : 여기서는 onClick 클릭이벤트 타입
    e.preventDefault(); // 페이지 새로고침 방지

    if(account.length === 0 || password.length === 0){ // 🌈 아이디, 비밀번호 검증 분리하기!
      alert("이메일과 비밀번호를 입력하세요.");
      return; // loginHandler 함수 종료
    }
    
    const data = {
      account,  // account : account // key 와 value 의 이름이 같은 경우 값을 하나만 적어도 적용된다. // request dto 의 필드명과 이름이 같아야 한다.
      password  // password : passord
    }

    axios.post('http://localhost:8080/api/user/login', data)  // data : 서버로 전달할 데이터 // { "key" : value } 
    .then((response)=>{
      const responseData = response.data;
      console.log(response);
      if(!responseData.result) {
        console.log("로그인에 실패했습니다.");
        return;
      }

      // 로그인 성공시 - 응답 데이터에서 토큰, 만료시간 가져옴
      const {token, experTime, user} = responseData.data; // responseData.data 객체에서 token 속성과 experTime 속성의 값을 가져옵니다.// js 구조분해 할당 // 객체 분해 할당 - 객체 속성 이름을 기반으로 데이터를 추출 - 객체 분해(destructuring)를 사용하는 것이며, 할당은 속성의 이름으로
      const expires = new Date();
      expires.setMilliseconds(expires.getMilliseconds + experTime); // 현재 날짜시간(new Date) + experTime 시간
      // 토큰 _ 쿠키설정 (쿠키이름, 쿠키값, 옵션_토큰만료시간) 
      // cookie 에 토큰(cookies.token)이 undefined || null 이 아닌 경우에는 로그인 상태를 확인할 수 있다.
      setCookies('token', token, { expires }); // { expires } 객체로 감싸는 이유 : key - value // 옵션을 추가하거나 변경할 때 간편하게 확장할 수 있다.
      setUser(user);
    })
    .catch((error)=> {
      alert("로그인에 실패했습니다.")
      console.log(error);
    });
  }


  return (
    <PageWrapper>
      {user!=null && (<>{user.userName}</>)}
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

