import userStore from "@/store/userStore";
import { Login } from "./login";
import ToDoListPage from "./todolist";
import Nav from "@/components/Nav";

export default function Home() {
  const { user } = userStore();

  return (
    <>
      {
        // 헤더는 로그인 후에 보여지도록 -> 유저가 있으면 헤더 보여주기
        user && <Nav />
      }
      {
        // 자바스크립트에서 값이 있으면 true, 아니면 false
        user ? <ToDoListPage /> : <Login />
      }
    </>
  );
}
