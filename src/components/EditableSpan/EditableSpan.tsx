import React, { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
};

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({ value, onChange, disabled = false }) => {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(value);

  const activateEditMode = () => {
    if (disabled) {
      return;
    }
    setEditMode(true);
    setTitle(value);
  };
  const activateViewMode = () => {
    setEditMode(false);
    onChange(title);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} disabled={disabled} />
  ) : (
    <span onDoubleClick={activateEditMode}>{value}</span>
  );
});
