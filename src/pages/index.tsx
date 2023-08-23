import userStore from '@/store/userStore'
import { Login } from './login'
import ToDoListPage from './todolist'
import { NavWrapper } from '@/styles/PageWrapper'
import useAuth from '@/hooks/useAuth'

export default function Home() {
  const { user } = userStore();
  const { userLogout } = useAuth();

  const logOutHandler = () => {
    userLogout(); // 로그아웃 hook(loginAPI + 로그인로직)   
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

