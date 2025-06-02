// import "./App.css";
import React, { useState, type ChangeEvent, type KeyboardEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type AddItemFormPropsType = {
  onClickAdd: (title: string) => void;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = ({ onClickAdd }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  // если для newTaskTitle выполняются условия, отправляет его выше
  // и обнуляет состояние ("")
  // иначе меняет состояние inputError
  const addItem = () => {
    if (newTaskTitle.trim() !== "") {
      onClickAdd(newTaskTitle);
      setNewTaskTitle("");
    } else {
      setInputError("Title is required");
    }
  };

  const onChangeSetNewTaskTitle = (event: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(event.target.value);

  // Функция обработчик события нажатия на клавишу
  // если нажата клавиша меняет состояние inputError на null
  // если нажат "Enter" запускает addItem()

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setInputError(null);
    if (event.charCode === 13) {
      addItem();
    }
  };

  const isAddBtnDisabled =
    !newTaskTitle || newTaskTitle.length >= 15 || /^\s+$/.test(newTaskTitle);

  const stylesButton = {
    maxWidth: "38px",
    maxHeight: "38px",
    minWidth: "38px",
    minHeight: "38px",
  };

  return (
    <div>
      <TextField
        error={!!inputError} // меняем тип из string на boolean, а затем false на true
        style={{ backgroundColor: "white" }}
        size={"small"}
        id="outlined-basic"
        label={inputError ? inputError : "Input title"}
        variant="outlined"
        value={newTaskTitle}
        onChange={onChangeSetNewTaskTitle}
        onKeyPress={onKeyPressHandler}
      />
      <Button
        disabled={isAddBtnDisabled}
        onClick={addItem}
        variant="contained"
        size="small"
        style={stylesButton}
      >
        +
      </Button>
    </div>
  );
};
