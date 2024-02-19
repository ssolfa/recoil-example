import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoListState } from './atom';
import { completedTodoCountState } from './selector';

export default function Counter(){
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const completedTodoCount = useRecoilValue(completedTodoCountState);

    const addItem = () => {
        setTodoList([...todoList, { text: `할 일 ${todoList.length + 1}`, completed: false }]);
      };
    
      const toggleItemCompletion = (index) => {
        const newList = [...todoList];
        newList[index] = { ...newList[index], completed: !newList[index].completed };
        setTodoList(newList);
      };

      return(
        <div>
      <h1>할 일 목록</h1>
      <button onClick={addItem}>할 일 추가</button>
      <p>완료된 할 일 수: {completedTodoCount}</p>
      <ul>
        {todoList.map((todo, index) => (
          <li key={index} onClick={() => toggleItemCompletion(index)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
      );
}