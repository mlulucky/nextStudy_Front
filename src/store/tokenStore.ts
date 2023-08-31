import { create } from 'zustand'

interface UserStore {
    refreshtoken: string;
    setRefreshToken: (refreshtoken: string) => void;
  }

const tokenStore = create<UserStore>((set)=>({
    refreshtoken: "",
    setRefreshToken: (refreshtoken: string)=>{
        set((state) => ({ ...state, refreshtoken }));
    }

}));