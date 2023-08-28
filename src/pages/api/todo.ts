import ToDoCreateRequestDTO from "@/dto/ToDoCreateRequestDTO";
import ToDoDTO from "@/dto/ToDoDTO";
import axios, { AxiosInstance } from "axios";

type requestTokenType = {
	Authorization: string
}

const requestToken = (token: string) : requestTokenType => { // 유저 인증 토큰
	return { 
		Authorization: `Bearer ${token}`
	}   
};

// nextjs 에서 cors 처리로 config 파일에 설정을 했기때문에, 도메인은 안적어도 됨!
function httpRequest(token: string) : AxiosInstance { // AxiosInstance : axios 인스턴스 생성 -> 요청에 원하는 값들을 설정할 수 있다.
	const headers = requestToken(token); // 유저 로그인시 발급되는 토큰을 서버 http api 요청 시 전달하기
	const httpClient = axios.create({
		baseURL: `/api/todo`, 
		headers, // headers : headers // 변수명 속성명 같으므로 축약가능 // (동일한 코드) headers : headers { Authorization: `Bearer ${token}` }
		withCredentials: true, // 클라이언트 -> 서버(다른 도메인) 에 http 요청시, 쿠키전송 허용 설정
	})
	return httpClient;
}

// get-조회 / post-등록 / patch-수정 / delete-삭제
export const getListAPI = async (token: string, userId: number) => { // await - 비동기 작업이 완료될때 까지 기다린다.
	const listResponse = await httpRequest(token).get(`/${userId}/list`).catch((error) => {console.error(error); null});
	if(!listResponse) {alert("응답데이터가 없습니다."); return null;} // 응답데이터 없는 경우 에러처리 
	return listResponse.data;
}

export const addAPI = async (token: string, data: ToDoCreateRequestDTO) => {
	const addResponse = await httpRequest(token).post(`/register`, data).catch((error)=>{console.error(error); null}); // request 요청 실패시 -> catch 문 실행, addResponse 에 null 할당
	if(!addResponse) {alert("응답데이터가 없습니다."); return null;} // addResponse 가 null 인지 체크 
	return addResponse.data;
}

export const modifyAPI = async (token: string, data: ToDoDTO) => {
	const modifyResponse = await httpRequest(token).patch(`/modify`, data).catch((error)=> {console.error(error), null});
	if(!modifyResponse) {alert("응답데이터가 없습니다."); return null;}
	return modifyResponse.data; // {id: content: done: }
}



