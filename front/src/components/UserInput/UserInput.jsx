import React from "react";
import { FormGroup, Input } from "reactstrap";
import "./UserInput.css";
import { useTranslation } from "react-i18next";
const LabeledInput = ({
  Label,
  value,
  HandleChange,
  name,
  type = "text",
  maxLength = 300,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <input
      class="un "
      type={type}
      align="center"
      name={name}
      autoComplete={false}
      onChange={HandleChange}
      value={value}
      placeholder={t(Label)}
      maxLength={maxLength}
    />
  );
};

export default LabeledInput;
