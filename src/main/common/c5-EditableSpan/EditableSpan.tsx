import React, { ChangeEvent, FocusEvent, MouseEvent, useState } from "react";
import Input from "@mui/material/Input";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import classes from "./EditableSpan.module.css";

type EditableSpanPropsType = {
  value: string;
  onChange: (changedValue: string) => void;
  // entityTaskStatus?: RequestStatusType;
};

export const EditableSpan: React.FC<EditableSpanPropsType> = ({
  value,
  onChange,
  // entityTaskStatus,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  // console.log(entityTaskStatus);

  let spanStyle: string = "";

  const activateEditMode = (event: MouseEvent<HTMLSpanElement>) => {
    setEditMode(true);
    setTitle(value);
  };

  const disactivateEditMode = (event: FocusEvent<HTMLInputElement>) => {
    setEditMode(false);
    onChange(title);
  };

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  return editMode ? (
    <Input
      value={title}
      onBlur={disactivateEditMode}
      onChange={onChangeTitleHandler}
      autoFocus
      // disabled={entityTaskStatus === "loading"}
    />
  ) : (
    <>
      <span onDoubleClick={activateEditMode} className={spanStyle}>
        {value}
      </span>
      <div
        onClick={activateEditMode}
        style={{
          display: "inline-block",
          marginLeft: "10px",
          cursor: "pointer",
        }}
      >
        <ModeEditIcon />
      </div>
    </>
  );
};
