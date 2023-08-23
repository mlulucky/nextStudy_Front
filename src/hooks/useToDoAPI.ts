import { listAPI } from '@/pages/api/todo'
import userStore from '@/store/userStore';
import { useCookies } from 'react-cookie';


export default function useToDoAPI() {
    const [cookies, setCookies] = useCookies();
    const { user } = userStore();
    const token = cookies.token;

    // 투두리스트 조회
    const todoListFunc = async (data:any) => {
        const todosResponse = await listAPI(token, user, data);





    }

    // export const listAPI = async (token: string, user: any, data: any) => {
    //     const url = `/api/todo/${user.id}/list`
    //     return toDoAPI(token, url, data)  
    // }  

}