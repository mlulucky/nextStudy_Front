import { useState } from "react";
import Form from "./Form";
import useAuth from "@/hooks/useAuth";
import Button from "./Button";

export default function JoinForm() {
  const [account, setAccount] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
	console.log("렌더링");
  const { userJoin } = useAuth();
  const data = {
    account, // account : account // setAccount() 사용하여 입력한 값을 account 로 저장 -> api 로 서버에 data 전달예정
    userName,
    email,
    password,
    passwordCheck,
  };
  const joinHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    userJoin(data); // 회원가입 hook(joinAPI + 회원가입로직)
  };

  return (
    <Form>
      <Form.Title>회원가입</Form.Title>
      <Form.Input placeholder="계정" onChange={setAccount} />
      <Form.Input placeholder="이름" onChange={setUserName} />
      <Form.Input placeholder="이메일" onChange={setEmail} />
      <Form.Input placeholder="비밀번호" onChange={setPassword} type="password"/>
      <Form.Input placeholder="비밀번호확인" onChange={setPasswordCheck} type="password"/>
      <Button onClick={joinHandler}>가입하기</Button>
    </Form>
  );
}
