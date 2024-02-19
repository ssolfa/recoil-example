import { selector } from 'recoil';
import { todoListState } from '/Users/solmee/Desktop/react/recoil-example/src/atom.jsx';

export const completedTodoCountState = selector({
  key: 'completedTodoCountState',
  get: ({ get }) => {
    const todoList = get(todoListState);
    return todoList.filter((todo) => todo.completed).length;
  },
});