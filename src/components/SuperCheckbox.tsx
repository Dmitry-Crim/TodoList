import React, { type ChangeEvent } from "react";
import Checkbox from "@mui/material/Checkbox";

type SuperCheckboxPropsType = {
  isDone: boolean;
  callBack: (isDone: boolean) => void;
};

export const SuperCheckbox: React.FC<SuperCheckboxPropsType> = ({
  isDone,
  callBack,
}) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    callBack(event.currentTarget.checked);
  };

  return <Checkbox onChange={onChangeHandler} checked={isDone} />;
};
