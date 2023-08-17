import axios from 'axios'

export const Login = (account: string, password: string) => axios.post('/api/user/login', {account, password});