import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import styled from 'styled-components'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  `
  const Form = styled.form`
    border: 1px solid red;
    width: 400px;
    height: 300px;
    padding: 10px;
  `

  const Title = styled.h3`

  `
  const Button = styled.button`
    width: 100%;
  `

  const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 14px 17px 13px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #dadada;
    
    &:focus {
      border: 1px solid red;
    }
  `

  return (
    <Div>
      <Form>
        <Title>로그인</Title>
        <div><Input placeholder='아이디'/></div>
        <div><Input placeholder='비밀번호'/></div>
        <input type="checkbox"/>로그인 상태 유지
        <Button>로그인</Button>
      </Form>
    </Div>
  )
}
