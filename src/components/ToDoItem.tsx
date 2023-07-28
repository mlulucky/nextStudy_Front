import React from "react";
import styled from "styled-components";

const Ul = styled.ul`
  padding-left: 0;
  list-style: none;
  border: 2px solid green;
  overflow-y: auto;
`;

const List = styled.li``;
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// export default function ToDoItem (toDoList : string[]) {
export default function ToDoItem({ toDoList }: { toDoList: string[] }) {
	// 체크
	// 체크박스 이미지 변경, todo 텍스트 색상변경
	// 할일의 개수( toDoList )에서 개수 -1 개
	
	// 삭제
	// 삭제 버튼 누르면 아이템 삭제
	// 할일의 개수( toDoList )에서 개수 -1 개
	const deleteToDo = () => {
		console.log("삭제");
	}

  return (
    <Ul>
      <List>
        {toDoList.map((a, i) => {
          return (
            <Div key={i}>
              <span>체크박스</span>
              <p> {a} </p>
              <button onClick={(e)=>{e.preventDefault(); deleteToDo();}}>삭제</button>
            </Div>
          );
        })}
      </List>
    </Ul>
  );

}
