import { useSelector } from "react-redux";
import todos from '@/modules/todos'

export default function useToDo() {
    const todoState = useSelector((state) => {return todos});
    return todoState;
}   