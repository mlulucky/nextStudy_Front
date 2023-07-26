import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import styled from 'styled-components'
import CheckBox from './checkbox'
import checkImg from '@public/check.png'
import iconImg from '@public/icon.png'
import { useState } from 'react'

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
    border: 1px solid #c6c6c6;
    width: 400px;
    height: 300px;
    padding: 20px 30px;
    border-radius: 6px;

  `

  const Title = styled.h3`

  `
  const Button = styled.button`
    width: 100%;
    border-radius: 6px;
    border: solid 1px rgba(0,0,0,.15);
    background-color: #03c75a;
    box-sizing: border-box;
    padding: 13px 0 13px;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: #fff;
    cursor: pointer;
    margin-top: 40px;
  `

  // styled-components 에 props 속성 주기
  const Input = styled.input<{isFirst?:boolean}>`
    width: 100%;
    box-sizing: border-box;
    padding: 14px 17px 13px;
    border: 1px solid #dadada;
    margin-top: ${({isFirst}) => isFirst ? '0' : '-1px'};
    border-radius: ${({isFirst}) => isFirst ? '6px 6px 0 0' : '0 0 6px 6px'};
    position: relative;

    &:focus {
      border: 1px solid #03c75a;
      outline: none;
      z-index: 5;
    }
  `



  return (
    <Div>
      <Form>
        <Title>Login</Title>
        <div style={{boxShadow: '0 2px 6px 0 rgba(68,68,68,.08)'}}>
          <Input isFirst placeholder='아이디'/>
          <Input placeholder='비밀번호'/>
        </div>
        <CheckBox/>
        <Button>로그인</Button>
      </Form>
    </Div>
  )
}
