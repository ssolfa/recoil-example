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
