import UserJoinRequestDTO from '@/dto/UserJoinRequestDTO';
import UserLoginRequestDTO from '@/dto/UserLoginRequestDTO';
import axios from 'axios'

// 공통함수로 axios 요청 보내기
const authRequest = async (url:string, data: any) => {
    // await axios : axios 로 데이터를 받아온 이후 데이터 로직 처리
    // axios.post(url, data) : post 방식으로 url 에 data 전달 - request body에 전달할 data(json)
    const response = await axios.post(url, data).catch((error) => {console.log(error); null});  // .catch((error) => null); 에러발생시 중단없이 계속진행할때(에러 무시)
    if(!response) {alert("응답데이터가 없습니다."); return null;}
    return response.data;
}


export const loginAPI = (data: UserLoginRequestDTO) => {
    const url = '/api/user/login';
    return authRequest(url, data);
}


export const joinAPI = async (data: UserJoinRequestDTO) => {
    const url = '/api/user/join';
    return authRequest(url, data);
}