import axios, { AxiosInstance } from 'axios';

type requestTokenType = {
	Authorization: string
}

const requestToken = (token: string) : requestTokenType => { // 유저 인증 토큰
	return { 
		Authorization: `Bearer ${token}`
	}   
};

// nextjs 에서 cors 처리로 config 파일에 설정을 했기때문에, 도메인은 안적어도 됨!
// todo api
export function toDoHttpRequest(token: string) : AxiosInstance { // AxiosInstance : axios 인스턴스 생성 -> 요청에 원하는 값들을 설정할 수 있다.
	const headers = requestToken(token); // 유저 로그인시 발급되는 토큰을 서버 http api 요청 시 전달하기
	const httpClient = axios.create({
		baseURL: `/api/todo`, 
		headers, // headers : headers // 변수명 속성명 같으므로 축약가능 // (동일한 코드) headers : headers { Authorization: `Bearer ${token}` }
		withCredentials: true, // 클라이언트 -> 서버(다른 도메인) 에 http 요청시, 쿠키전송 허용 설정
	})
	return httpClient;
}

// user api
export function userHttpRequest(token: string) : AxiosInstance { 
	const headers = requestToken(token); 
	const httpClient = axios.create({
		baseURL: `/api/user`, 
		headers, 
		withCredentials: true, 
	})
	return httpClient;
}
