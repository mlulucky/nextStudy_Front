import { useState } from "react";
import styled from "styled-components";
import iconImg from "@public/icon.png";

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  padding-left: 20px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-position: -244px -87px;
    background-repeat: no-repeat;
    width: 18px;
    height: 18px;
    background-color: #fff;
    background-image: url(${iconImg.src});
    background-size: 266px 225px;
    background-repeat: no-repeat;
  }
`;
const LoginKeepWrap = styled.div`
  margin-top: 15px;
  text-align: left;
  position: relative;

  ${Input}:checked + ${Label}::before {
    background-position: -244px -167px;
    background-repeat: no-repeat;
    width: 18px;
    height: 18px;
  }
`;

export default function CheckBox() {
  let [isChecked, setIsChecked] = useState(false);

  const check = () => {
    setIsChecked(!isChecked);
  };

  return (
    <LoginKeepWrap>
      <Input id="check" type="checkbox" checked={isChecked} onChange={()=>{ setIsChecked(!isChecked);}}/>         
      <Label htmlFor="check">로그인상태 유지</Label>
    </LoginKeepWrap>
  );
}
