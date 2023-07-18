import React from "react";

import { CheckBox } from "devextreme-react/check-box";
import withLabel from "./withLabel";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const Input = ({
  label,
  value = false,
  name,
  handleChange,
  readOnly = false,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <CheckBox
      value={value}
      rtlEnabled={i18n.language == "ar"}
      // style={{ direction: "ltr" }}
      onValueChanged={({ value }) => handleChange({ name, value })}
      readOnly={readOnly}
    />
  );
};

export default memo(withLabel(Input));
