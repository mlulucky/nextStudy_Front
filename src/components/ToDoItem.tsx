import React from 'react'
import styled from 'styled-components'

export default function ToDoItem  ({toDoList}){
    
    return (
        <div>
            공부하기
            <div>
                { 
                    toDoList.map((a, i)=>{
                        return ""
                    })

                }
            </div>
        </div>

    )
}