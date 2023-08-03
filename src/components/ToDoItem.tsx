import React from "react";
import {styled, css} from "styled-components";
import { MdDone, MdRemoveCircleOutline } from 'react-icons/md';

const Ul = styled.ul`
  padding-left: 0 !important;
  border: 2px solid green;
	flex: 3;
  overflow-y: auto;
`;

const Remove = styled.div`
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  visibility: hidden;

`; 

const List = styled.li`
	display: flex;
	align-items: center;
	padding: 10px 0;
	&:hover {
		${Remove} { 
			visibility: visible;


`;

const ToDo = styled.div<{done: boolean}>`
	flex: 1;
	text-align: left;
	${props => props.done && css` color: #aaa; text-decoration: line-through; `}
`

const Check = styled.div<{done: boolean}>`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;

	${props =>
    props.done ?
    css`
      border: 1px solid #03c75a;
      color: #fff;
			background-color: #03c75a;
    `
		: 
		css`
			color: #ced4da;
		`
	}
  
`


export default function ToDoItem({todo}: { todo : {id: number; todo: string; done: boolean;}}) { 
  //     todo : { id: number; todo: string; done: boolean }  // todo 의 프로퍼티를 개별 프로퍼티의 타입들로 구성 
  // 🌈 todo : { todo : { id: number; todo: string; done: boolean } } // 컴포넌트의 프로퍼티 타입을 객체 형태로 적용 // == todo 는 todo 객체
  return(
    <List >
      <Check></Check>
      <ToDo>{todo.todo}</ToDo>
      <Remove></Remove>
    </List>

  )
}


 

// export default function ToDoItem({ toDoList, done, setToDoList, setDone }: { toDoList: string[], done: boolean, setToDoList: (newList : string[]) => void, setDone: (status : boolean) => void }) {
// 	const completeToDo = (i: number) => {
// 		console.log("투두 완료");
// 		setDone(!done);

// 	}	
// 	const deleteToDo = (i: number) => {
// 		let newToDoList = [...toDoList];
// 		newToDoList.splice(i,1);
// 		setToDoList(newToDoList);
// 	}

//   return (
//     <Ul>
			
// 			{toDoList.map((a, i) => {
// 				return (
// 					<List key={i}>
// 							<Check done={done} onClick={(e)=>{ completeToDo(i);}} > <MdDone/ ></Check>
// 							<ToDo done={done}> {a} </ToDo>
// 							<Remove onClick={
// 								()=>{deleteToDo(i);}
// 							}> <MdRemoveCircleOutline /> </Remove>
// 					</List>
// 				);
// 			})}
//     </Ul>
//   );

// }
