import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import userStore from '@/store/userStore'
import { Login } from './login'
import ToDoListPage from './todolist'
import { MdPerson, MdLogout } from 'react-icons/md'
import { NavWrapper } from '@/styles/PageWrapper'

export default function Home() {
  const [toDoResponse, setToDoResponse] = useState<string>('');

  const [cookies, setCookies] = useCookies();
  const { user, removeUser } = userStore();
  const [loginUser, setLoginUser] = useState(true);

  const logOutHandler = () => {
    setCookies('token', '', {expires: new Date()}); // 쿠키삭제 // 토큰 '' 빈값으로 처리 , 만료시간은 현재시간으로 설정
    removeUser(); // 유저 null 
  }


  const loginUserProfile = () => {

  }

  const getToDo = async (token : string) => {
    const requestToken = {
      headers: {
        Authorization : `Bearer ${token}`
      }
    };

    console.log("token", token);
    await axios.get('http://localhost:8080/api/todo/', requestToken)
    .then((response)=> {
      setToDoResponse(response.data)
    }).catch((error)=> '');
  
  }
  
  useEffect(()=>{
    const token = cookies.token; 
    if(token) getToDo(token);
    else setToDoResponse(''); // token 이 존재 안한다면
  }, [cookies.token]); // token 가 변경 될때마다 재렌더링

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

