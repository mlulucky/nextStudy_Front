import UserJoinRequestDTO from "@/dto/UserJoinRequestDTO";
import UserLoginRequestDTO from "@/dto/UserLoginRequestDTO";
import { joinAPI, loginAPI } from "@/pages/api/auth";
import userStore from "@/store/userStore";
import { useCookies } from "react-cookie";
import axios from 'axios'
import tokenStore from "@/store/tokenStore";
import { useRouter } from "next/router";

export type UseAuthType = {
  userJoin: (data: UserJoinRequestDTO) => Promise<void>;
  userLogin: (data: UserLoginRequestDTO) => Promise<void>;
  userLogout: () => void;
  keepLogin: ()=> void;
};

// 회원가입, 로그인, 로그아웃
export default function useAuth(): UseAuthType {
  const [cookies, setCookies] = useCookies();
  const { setUser, removeUser } = userStore(); // userStore 안에 있는 setUser 와 동일한 속성명의 속성을 대입한다. - 객체 구조분해할당
  // const {setAccessToken} = tokenStore(); 
  const router = useRouter();

  // 회원가입
  const userJoin = async (data: UserJoinRequestDTO) => {
    const joinResponse = await joinAPI(data);
    if (!joinResponse || !joinResponse.result) {
      alert("회원가입에 실패했습니다.");
      return;
    }
    console.log("joinResponse", joinResponse);
    alert("회원가입에 성공했습니다.");
  };

  // 로그인
  const userLogin = async (data: UserLoginRequestDTO) => {
    if (data.account.length === 0 || data.password.length === 0) {
      alert("이메일과 비밀번호를 입력하세요.");
      return; // loginHandler 함수 종료
    }

    try {
      const loginResponse = await loginAPI(data); // // data : 서버로 전달할 데이터 // { "key" : value }
      if (!loginResponse || !loginResponse.result) {
        alert("로그인에 실패했습니다." + loginResponse.message);
        return;
      }

      // 로그인 성공시 - 응답 데이터에서 토큰, 만료시간 가져옴
      const { token, refreshToken, experTime, user } = loginResponse.data;
      const expires = new Date();
      expires.setMilliseconds(expires.getMilliseconds() + experTime); // 현재 날짜시간(new Date) + experTime 시간
      setCookies("token", token, { expires }); 
      setCookies("refreshToken", refreshToken, { expires }) // accesstoken 재발급 위한 토큰, 로그인유지
      setUser(user);
      
      localStorage.setItem("token", token);

      // 로그인체크  setIsLogin(true); state 만들기
      

    } catch (error) {
      console.error("로그인 실패: ", error);
    }
  };

  // 로그인유지
  const keepLogin = () => {
    const refreshToken = cookies.refreshToken;




    console.log("refreshToken",refreshToken);
  }

  // 로그아웃
  const userLogout = () => {
    setCookies("token", "", { expires: new Date() }); // 쿠키삭제 // 토큰 '' 빈값으로 처리 , 만료시간은 현재시간으로 설정
    setCookies("refreshToken", "", { expires: new Date() });
    removeUser(); // 유저 null
    router.push("/"); // 메인페이지로 이동
  };

  return { userJoin, userLogin, userLogout, keepLogin};
}
