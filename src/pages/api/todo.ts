import axios from "axios";

// todoAPI -> 인증토큰, url, 데이터 넘기기
// axios(http 메서드) -> listAPI(get) / addAPI(post) / updateAPI(patch) / deleteAPI(delete) 
type requestTokenType = {
    headers: {
        Authorization: string
    }
}

const requestToken = (token: string) : requestTokenType => { // 클래스 내부 메서드는 function 을 붙이지 않는다.
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
};

// enum Method  {
//     GET = 'get',
//     POST = 'post',
//     PATCH = 'patch',
//     DELETE = 'delete'
// }

type Method = 'get' | 'post' | 'patch' | 'delete';

// 👀 todo apit 에서 받아오는 인자에 타입으로 token 추가해서, extends 해서 타입만들기 ?

const getToDoAPI = async (method: Method, user: any, token: string) => {
    const url = `/api/todo/${user.id}/list`;

    const authToKen = requestToken(token);
    const response = await axios({method: method, url: url, tokens: authToKen})
    // .catch((error) => {console.log(error); null});
    if(!response) return null;
    const result = response.data;
    return result;
}



// export class toDoAPI { // 객체

//     // reqesToken(token: string) : requestTokenType { // 클래스 내부 메서드는 function 을 붙이지 않는다.
//     //     return {
//     //         headers: {
//     //             Authorization: `Bearer ${token}`
//     //         }
//     //     }
//     // };

//     async getToDoAPI(user: any, token: string) {
//         const requestToken = this.requestToken(token);
//         await axios.get(`/api/todo/${user.id}/list`, requestToken).catch((error) => {console.log(error); null});
//     }


//     async addToDoAPI() {
//         const requestToken = this.requestToken(token);
//         await axios.post(url, requestToken).catch((error) => {console.log(error); null});
//     }


//     async updateToDoAPI() {

//     }


//     async deleteToDoAPI() {

//     }





// }


// export const toDoAPI = async (token: string, url: string, data: any) => {
    // const requestToken = {
    //     headers: {
    //         Authorization: `Bearer ${token}` // 쿠키에서 토큰을 가져와서 헤더에 포함
    //     }
    // }
    // let response:any = null;

    // export const getAPI = async () => {
    //     response = await axios.get(url, requestToken).catch((error) => {console.log(error); null});     
    // }  
    // const postAPI = async () => {
    //     response = await axios.post(url, requestToken).catch((error) => {console.log(error); null});     
    // }   
    // const patchAPI = async () => {
    //     response = await axios.patch(url, requestToken).catch((error) => {console.log(error); null});     
    // }  
    // const deleteAPI = async () => {
    //     response = await axios.delete(url, requestToken).catch((error) => {console.log(error); null});     
    // }  

    // if(!response) return null;

    // const result = response.data;
    // return result;
// }


// export const listAPI = async (token: string, user: any, data: any) => {
//     const url = `/api/todo/${user.id}/list`
//     toDoAPI(token, url, data)  



// }  









// export const toDoListAPI = async (token: string, user: any) => {
//     const requestToken = {
//       headers: {
//         Authorization: `Bearer ${token}` // 쿠키에서 토큰을 가져와서 헤더에 포함
//       }
//     }

//     const response = await axios.get(`/api/todo/${user.id}/list`, requestToken)
//     .catch((error) => {console.log(error); null;})
//     if(!response) {console.log("응답이 없거나 비정상적인 경우"); return null;}
 

//     const result = response.data;
//     return result;
//   }

// export const addToDoAPI = (data: any) => {
//     const url = "/api/todo/1/todos";
//     return toDoAPI(url, data);
// }