import PageWrapper from "@/styles/PageWrapper";
import LoginForm from "@/components/LoginForm";

export function Login(){
  return (
    <PageWrapper>
      <LoginForm/> 
      <span style={{color: '#777'}}>아직 회원이 아니신가요? 회원가입</span>  
    </PageWrapper>
  )
}