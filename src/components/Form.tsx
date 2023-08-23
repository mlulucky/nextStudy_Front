import React from 'react'
import styled from 'styled-components';

type FormProps = {
    children: React.ReactElement<InputProps>[];
}

type InputProps = {
    placeholder : string;
    onChange? : (value : string) => void; 
    isfirst? : boolean;
}

function Form({children} : FormProps){
    return (
        <FormWrapper>{children}</FormWrapper>
    )
}

function Input({placeholder, onChange} : InputProps){
    const InputChangeHanlder = (e : React.ChangeEvent<HTMLInputElement>) => {  // 이벤트타입<이벤트를 활용할 HTML노드타입>
        const newValue = e.target.value;

        if(onChange) { // onChange 함수가 있으면 // onChange 함수 -> Input 컴포넌트를 사용하는 곳에서 onChange Props 에 담은 함수 // 예) setAccount(), setUserName() ....
            onChange(newValue); // 외부에서 전달받은 onChange 함수를 호출하면서 입력값을 넘김
        }
    }

    return (
        <div>
            <StyledInput placeholder={placeholder} onChange={(e)=>{InputChangeHanlder(e)}}></StyledInput> 
        </div>
    )
}


export default Object.assign(Form, {Input}); // Form = Form + Input // Form 객체에 속성으로 Input 객체 추가({} 중괄호로 감싸야함)


// 스타일컴포넌트 정의 - 컴포넌트 외부로 이동 : 해당 컴포넌트가 렌더링될 때마다 스타일 컴포넌트가 다시 생성되지 않도록 합니다.
const FormWrapper = styled.form`
border: 1px solid #c6c6c6;
width: 450px;
// height: 300px;
padding: 20px 30px;
border-radius: 10px;
margin-bottom : 1rem;
`;

const StyledInput = styled.input<{isfirst?:boolean}>`
width: 100%;
box-sizing: border-box;
padding: 14px 17px 13px;
border: 1px solid #dadada;
margin-top: ${({isfirst}) => isfirst ? '0' : '-1px'};
border-radius: ${({isfirst}) => isfirst ? '6px 6px 0 0' : '0 0 6px 6px'};
position: relative;
&:focus {
  border: 1px solid #03c75a;
  outline: none;
  z-index: 5;
}
`;