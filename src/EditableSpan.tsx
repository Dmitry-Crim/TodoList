import React, { useState, type ChangeEvent } from "react";
import "./App.css";

type EditableSpanPropsType = {
  oldTitle: string;
  onClickAdd: (title: string) => void;
};

export const EditableSpan: React.FC<EditableSpanPropsType> = ({
  oldTitle,
  onClickAdd,
}) => {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(oldTitle);

  const editHandler = () => {
    setEdit(!edit);
    if (edit) {
      // Функция отправляет newTitle только из Input
      onClickAdd(newTitle);
    }
  };

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  return edit ? (
    <input
      value={newTitle}
      onBlur={editHandler}
      autoFocus
      onChange={onChangeInputHandler}
    />
  ) : (
    <span onDoubleClick={editHandler}>
      {oldTitle}
      {/* {oldTitle !== newTitle ? newTitle : oldTitle} */}
    </span>
  );
};
