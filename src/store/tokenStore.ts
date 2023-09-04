import { create } from 'zustand'

interface UserStore {
    accessToken: string;
    setToken: (accessToken: string) => void;
  }

const tokenStore = create<UserStore>((set)=>({
    accessToken: "",
    setToken: (accessToken: string)=>{
        set((state) => ({ ...state, accessToken}));
    }
}));

export default tokenStore;