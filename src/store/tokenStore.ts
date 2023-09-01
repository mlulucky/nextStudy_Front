import { create } from 'zustand'

interface UserStore {
    accessToken: string;
    //refreshToken: string;
    setToken: (accessToken: string) => void;
    // setToken: (accessToken: string, refreshToken: string) => void;
  }

const tokenStore = create<UserStore>((set)=>({
    accessToken: "",
    //refreshToken: "",
    setToken: (accessToken: string)=>{
        set((state) => ({ ...state, accessToken}));
    }
    // setToken: (accessToken: string, refreshToken: string)=>{
    //     set((state) => ({ ...state, accessToken, refreshToken}));
    // }

}));

export default tokenStore;