## 📁 Recoil 사용 예제

Recoil을 사용하여 간단한 할 일 목록 애플리케이션을 만들어 보았다. \
자세한 과정 ⬇️ \
https://5ffthewall.tistory.com/73

### `atom.jsx`
- 할 일 목록을 담을 `atom` 파일
```javascript
import { atom } from 'recoil';

export const todoListState = atom({
  key: 'todoListState', 
  default: [],
});
```

### `selector.jsx`
- 완료된 할 일 수를 계산하는 `selector` 파일
```javascript
import { selector } from 'recoil';
import { todoListState } from '/Users/solmee/Desktop/react/recoil-example/src/atom.jsx';

export const completedTodoCountState = selector({
  key: 'completedTodoCountState',
  get: ({ get }) => {
    const todoList = get(todoListState);
    return todoList.filter((todo) => todo.completed).length;
  },
});
```

### `counter.jsx`
- `useRecoilState()`를 사용하여 구독해서 값을 업데이트함
- `useRecoilValue()`를 사용해 selector 값을 읽어옴
```javascript
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
```

### `totalCounter.jsx`
- `useRecoilValue()`로 selector의 값을 읽어옴
```javascript
import React from 'react';
import { useRecoilValue } from 'recoil';
import { completedTodoCountState } from './selector';

export default function TotalCount() {
  const completedTodoCount = useRecoilValue(completedTodoCountState);

  return (
    <div>
        <p>totalCounter 컴포넌트</p>
      <p>완료된 할 일 총 수: {completedTodoCount}</p>
    </div>
  );
}

```
