import React, { useCallback, useEffect } from "react";
import { FormGroup } from "reactstrap";
import TextEditor from "../TextEditor/TextEditor";

const TextEditorTwoLanguages = ({
  id,
  label,
  value,
  valueEn,
  onValueChange,
}) => {
  const onSaveHandle = useCallback(
    (_value, id) => {
      console.log(_value);
      onValueChange &&
        _value !== value &&
        !id.includes("En") &&
        onValueChange({ value: _value ? _value.toString() : null, name: id });
    },
    [value]
  );
  const onSaveHandleEn = useCallback(
    (_value, id) => {
      onValueChange &&
        _value !== valueEn &&
        id.includes("En") &&
        onValueChange({ value: _value ? _value.toString() : null, name: id });
    },
    [valueEn]
  );
  return (
    <>
      <FormGroup>
        <label>{label}</label>
        <TextEditor
          height="500px"
          id={id}
          value={value}
          onSaveHandle={onSaveHandle}
        />
      </FormGroup>
      <FormGroup>
        <label>{label} English</label>
        <TextEditor
          height="500px"
          id={id + "En"}
          value={valueEn}
          onSaveHandle={onSaveHandleEn}
        />
      </FormGroup>
    </>
  );
};

export default React.memo(TextEditorTwoLanguages);
