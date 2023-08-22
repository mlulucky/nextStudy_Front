import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import userStore from '@/store/userStore'
import { Login } from './login'
import ToDoListPage from './todolist'
import { MdPerson, MdLogout } from 'react-icons/md'
import { NavWrapper } from '@/styles/PageWrapper'

export default function Home() {
  const [cookies, setCookies] = useCookies();
  const { user, removeUser } = userStore();
  const [loginUser, setLoginUser] = useState(true);

  const logOutHandler = () => {
    setCookies('token', '', {expires: new Date()}); // 쿠키삭제 // 토큰 '' 빈값으로 처리 , 만료시간은 현재시간으로 설정
    removeUser(); // 유저 null 
  }

  return (
    <>
      
      {
        user &&
        (
          <NavWrapper>
            <div>
              <span style={{fontWeight: 'bold'}}>{user.userName}</span>님
            </div>
            <span onClick={()=>{ logOutHandler();}} style={{color: '#aaa'}}>로그아웃</span>
          </NavWrapper>
        )
      }
          
      { // 자바스크립트에서 null (빈값) 은 false, 아니면 true
        user ? (<ToDoListPage />) : (<Login />)
      }
    </>
  )

}

