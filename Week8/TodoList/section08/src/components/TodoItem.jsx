import React from "react";
import { useContext } from "react";
import "./TodoItem.css";
import { memo } from "react";
import { TodoDispatchContext } from "../App";

const TodoItem = ({ id, isDone, content, date }) => {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);

  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <input onChange={onChangeCheckbox} checked={isDone} type="checkbox" />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toDateString()}</div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
};

// export default memo(TodoItem, (prevProps, nextPRops) => {
//   if (prevProps.id !== nextPRops.id) return false;
//   if (prevProps.isDone !== nextPRops.isDone) return false;
//   if (prevProps.content !== nextPRops.content) return false;
//   if (prevProps.date !== nextPRops.date) return false;

//   return true;
// });

export default memo(TodoItem);
