import { useState } from "react";
import { PageWrapper } from "@/styles/PageWrapper";
import Form from "@/components/Form";
import CheckBox from "@/components/CheckBox";
import Button from "@/components/Button";
import useAuth from '@/hooks/useAuth';

export function Login(){
  const [account, setAccount] = useState<string>(""); // useState 안에있는 배열의 요소 순서대로 account, setAccount 변수에 대입
  const [password, setPassword] = useState<string>("");
  const { userLogin } = useAuth(); // 함수에 반환값 타입을 설정했으므로 타입스크립트가 반환된 타입으로 타입추론예정(제네릭x)

  const loginHandler = async (e: React.MouseEvent<HTMLButtonElement>) => { // e : 여기서는 onClick 클릭이벤트 타입
    e.preventDefault(); // 페이지 새로고침 방지

    if(account.length === 0 || password.length === 0){ // 🌈 아이디, 비밀번호 검증 분리하기!
      alert("이메일과 비밀번호를 입력하세요.");
      return; // loginHandler 함수 종료
    }
    
    const data = {
      account,  // account : account // key 와 value 의 이름이 같은 경우 값을 하나만 적어도 적용된다. // request dto 의 필드명과 이름이 같아야 한다.
      password  
    }

    userLogin(data); // 로그인 hook(loginAPI + 로그인로직)   
  }


  return (
    <PageWrapper>
      <div>
        <Form>
            <h3>Login</h3>
            <div style={{boxShadow: '0 2px 6px 0 rgba(68,68,68,.08)'}}>
            <Form.Input isfirst placeholder='아이디'  onChange={(e)=>{setAccount(e)}}/>
            <Form.Input placeholder='비밀번호'  onChange={(e)=>{setPassword(e)}}/>
            </div>
            <CheckBox/>
            <Button onClick={(e)=>{ loginHandler(e); }}>로그인</Button>
        </Form>
        <div style={{color: '#777'}}>아직 회원이 아니신가요? 회원가입</div>
      </div>  
    </PageWrapper>
  )
}