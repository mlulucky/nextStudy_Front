import UserJoinRequestDTO from "@/dto/UserJoinRequestDTO";
import UserLoginRequestDTO from "@/dto/UserLoginRequestDTO";
import { joinAPI, loginAPI } from "@/pages/api/auth";
import userStore from "@/store/userStore";
import { useCookies } from "react-cookie";

export type UseAuthType = {
    userJoin: (data: UserJoinRequestDTO) => Promise<void>;
    userLogin: (data: UserLoginRequestDTO) => Promise<void>;
    userLogout: () => void;
}

// 회원가입, 로그인, 로그아웃
export default function useAuth(): UseAuthType {
    const [cookies, setCookies] = useCookies();
    const {user, setUser, removeUser} = userStore();  // userStore 안에 있는 setUser 와 동일한 속성명의 속성을 대입한다. - 객체 구조분해할당  

    // 회원가입
    const userJoin = async (data: UserJoinRequestDTO) => {
        const joinResponse = await joinAPI(data);
        if(!joinResponse || !joinResponse.result) {
            alert('회원가입에 실패했습니다.');
            return;
        }

        alert("회원가입에 성공했습니다.");
    }

    // 로그인
    const userLogin = async (data: UserLoginRequestDTO) => {
        try {
            const loginResponse = await loginAPI(data); // // data : 서버로 전달할 데이터 // { "key" : value }      
            if(!loginResponse || !loginResponse.result) {
              alert("로그인에 실패했습니다." + loginResponse.message); 
              return;
            }
    
            // 로그인 성공시 - 응답 데이터에서 토큰, 만료시간 가져옴
            const {token, experTime, user} = loginResponse.data; // 객체 구조분해할당
            const expires = new Date();
            expires.setMilliseconds(expires.getMilliseconds() + experTime); // 현재 날짜시간(new Date) + experTime 시간
            setCookies('token', token, { expires }); // { expires } 객체로 감싸는 이유 : key - value // 옵션을 추가하거나 변경할 때 간편하게 확장할 수 있다.
            setUser(user);

        }catch(error) {
            console.error("로그인 실패: ", error);
        }
    };

    // 로그아웃
    const userLogout = () => {
        setCookies('token','', { expires: new Date() }); // 쿠키삭제 // 토큰 '' 빈값으로 처리 , 만료시간은 현재시간으로 설정
        removeUser(); // 유저 null 
    };


    return { userJoin, userLogin, userLogout }

}