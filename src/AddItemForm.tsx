import "./App.css";
import React, { useState, type ChangeEvent, type KeyboardEvent } from "react";

type AddItemFormPropsType = {
  onClickAdd: (title: string) => void;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = ({ onClickAdd }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [inputError, setInputError] = useState(false);

  const onClickAddTask = () => {
    const trimedTitle = newTaskTitle.trim();
    if (trimedTitle) {
      onClickAdd(trimedTitle);
    } else {
      setInputError(true);
    }
    setNewTaskTitle("");
  };

  const onChangeSetNewTaskTitle = (event: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(event.target.value);

  const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) =>
    event.key === "Enter" && onClickAddTask();

  const isAddBtnDisabled =
    !newTaskTitle || newTaskTitle.length >= 15 || /^\s+$/.test(newTaskTitle);

  const userMessage =
    newTaskTitle.length < 15 ? (
      <span>Enter new title</span>
    ) : (
      <span style={{ color: "red" }}>Your title is too long</span>
    );

  return (
    <div>
      <input
        value={newTaskTitle}
        onChange={onChangeSetNewTaskTitle}
        onKeyDown={onKeyDownAddTask}
        className={inputError ? "inputError" : undefined}
      />
      <button disabled={isAddBtnDisabled} onClick={onClickAddTask}>
        +
      </button>
      <div>{userMessage}</div>
    </div>
  );
};
