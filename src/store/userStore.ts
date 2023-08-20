import { create } from 'zustand'

interface UserStore {
    user : any;
    setUser : (user:any) => void;
    removeUser : ()=> void;
}

// 로그인시 유저정보를 저장할 수 있다.
// 유저정보는 모든 컴포넌트에서 필요한 정보이므로, store 에서 관리하면 모든 컴포넌트에서 사용할 수 있다. 
const userStore = create<UserStore>((set)=>({ // (set) => ({ }) // 소괄호 안에 { } 중괄호 객체를 반환 // 객체를 반환하기 위해 소괄호({})로 감싼 
    user : null,
    setUser : (user: any) => {
        set((state)=> ({...state, user}));
    },
    removeUser : () => {
        set((state)=> ({...state, user: null}));
    }
}));

export default userStore;