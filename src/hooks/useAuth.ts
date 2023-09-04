import UserJoinRequestDTO from "@/dto/UserJoinRequestDTO";
import UserLoginRequestDTO from "@/dto/UserLoginRequestDTO";
import { joinAPI, loginAPI, userInfoAPI } from "@/pages/api/auth";
import userStore from "@/store/userStore";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import UserLoginDataDTO from "@/dto/UserLoginDataDTO";
import { useState } from "react";

export type UseAuthType = {
  userJoin: (data: UserJoinRequestDTO) => Promise<void>;
  userLogin: ({
    data,
    isChecked,
  }: {
    data: UserLoginRequestDTO;
    isChecked: boolean;
  }) => Promise<void>;
  userInfo: () => Promise<UserLoginDataDTO>;
  userCheck: () => Promise<void>;
  userLogout: () => void;
  keepLogin: () => void;
};

// 회원가입, 로그인, 로그아웃
export default function useAuth(): UseAuthType {
  const [cookies, setCookies] = useCookies();
  const { user, setUser, removeUser } = userStore(); // userStore 안에 있는 setUser 와 동일한 속성명의 속성을 대입한다. - 객체 구조분해할당
  // const {setAccessToken} = tokenStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // 회원가입
  // 계정, 이메일 중복체크 -> 별도 API 없이 join api 에서 유효성체크 메세지로 응답처리
  const userJoin = async (data: UserJoinRequestDTO) => {
    if (
      !data.account ||
      !data.userName ||
      !data.email ||
      !data.password ||
      !data.passwordCheck
    ) {
      alert("정보를 입력해주세요.");
      return;
    }

    // 이메일 유효성 검사
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(data.email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    const joinResponse = await joinAPI(data);
    if (!joinResponse || !joinResponse.result) {
      alert(joinResponse.message);
      return;
    }

    console.log("joinResponse", joinResponse);
    alert(joinResponse.message);
    router.push("/login");
  };

  // 회원정보조회
  const userInfo = async () => {
    const userInfoResponse = await userInfoAPI(cookies.token);
    if (!userInfoResponse || !userInfoResponse.result) {
      console.log("회원정보를 불러오는데 실패했습니다.");
      return;
    }
    return userInfoResponse.data;
  };

  // 로그인
  const userLogin = async ({
    data,
    isChecked,
  }: {
    data: UserLoginRequestDTO;
    isChecked: boolean;
  }) => {
    if (data.account.length === 0 || data.password.length === 0) {
      alert("이메일과 비밀번호를 확인해주세요.");
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
      // setCookies("refreshToken", refreshToken, { expires }); // accesstoken 재발급 위한 토큰, 로그인유지
      setCookies("id", user.id, { expires });
      setCookies("name", user.userName, { expires });
      setUser(user);

      alert(loginResponse.message);
      router.push("/todolist");
    } catch (error) {
      console.error("로그인 실패: ", error);
    }
  };

  // 로그인체크
  // 이동중 로딩시간의 경우 로딩을 보여주기
  const userCheck = async () => {
    try {
      setIsLoading(true);
      const { id, account, userName } = await userInfo();
      setUser({ id, account, userName });
    } catch (error) {
      // 유저 정보를 불러오는 도중에 오류가 발생하면 로그인 페이지로 이동
      router.push("/login"); // login 페이지로 리디렉션 // router.push 페이지는 export default
    } finally {
      setIsLoading(false);
    }
  };

  // 로그인유지
  const keepLogin = () => {
    const refreshToken = cookies.refreshToken;
    console.log("refreshToken", refreshToken);
  };

  // 로그아웃
  const userLogout = () => {
    // 쿠키에 값이있으면 -> 쿠키 값 삭제
    setCookies("token", "", { expires: new Date() }); // 쿠키삭제 // 토큰 '' 빈값으로 처리 , 만료시간은 현재시간으로 설정
    // setCookies("refreshToken", "", { expires: new Date() });
    setCookies("id", "", { expires: new Date() });
    setCookies("name", "", { expires: new Date() });
    removeUser(); // 유저 null
    router.push("/"); // 메인페이지로 이동
  };

  return { userJoin, userLogin, userInfo, userLogout, keepLogin, userCheck };
}
