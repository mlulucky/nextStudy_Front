import useAuth from "@/hooks/useAuth";
import userStore from "@/store/userStore";
import styled from "styled-components";

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  box-shadow: 0px 0px 4px 0px #c6c6c6;
`;

export default function Nav() {
  const { user } = userStore();
  const { userLogout } = useAuth();
  const logOutHandler = () => {
    userLogout(); // 로그아웃 hook(loginAPI + 로그인로직)
  };

	// Nav 와 todolist/index.tsx 컴포넌트가 합쳐져있어서 todolist index 페이지에서 useEffect 로 유저체크를 한 후 user 의 정보를 Nav 컴포넌트에 입력
  return (
    <NavWrapper>
      <div>
      	<span style={{ fontWeight: "bold" }}>{user.userName}</span>님
      </div>
      <span style={{ color: "#aaa", cursor: "pointer" }} onClick={() => {logOutHandler();}}>로그아웃</span>
    </NavWrapper>
  );
}
