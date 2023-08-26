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

  return (
    <NavWrapper>
      <div>
        <span style={{ fontWeight: "bold" }}>{user.userName}</span>님
      </div>
      <span onClick={() => {logOutHandler();}} style={{ color: "#aaa" }}>로그아웃</span>
    </NavWrapper>
  );
}
