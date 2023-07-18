import React from "react";
import TextArea from "devextreme-react/text-area";
import { Validator, RequiredRule } from "devextreme-react/validator";
import withLabel from "./withLabel";
import { useTranslation } from "react-i18next";

const Input = ({
  label,
  name,
  value,
  handleChange,
  required = false,
  height = 90,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <TextArea
      placeholder={label}
      value={value || ""}
      name={name}
      onInput={({ event }) => handleChange(event.target)}
      height={height}
      rtlEnabled={i18n.language == "ar"}
    >
      {required && (
        <Validator>
          <RequiredRule message="هذا الحقل مطلوب" />
        </Validator>
      )}
    </TextArea>
  );
};

// export default withLabel(Input);
export default withLabel(Input);
