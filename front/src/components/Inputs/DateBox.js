import React from "react";
import { TextBox } from "devextreme-react";
import withLabel from "./withLabel";
import { Validator, RequiredRule } from "devextreme-react/validator";
import DateBox from "devextreme-react/date-box";
import { useTranslation } from "react-i18next";
const Input = React.memo(
  ({
    label,
    name = "date",
    value,
    handleChange,
    size = "col-12",
    required = true,
    stylingMode = "filled",
    readOnly = false,
    className = "",
    type = "datetime",
  }) => {
    const { t, i18n } = useTranslation();
    return (
      <DateBox
        className={className}
        readOnly={readOnly}
        rtlEnabled={i18n.language == "ar"}
        stylingMode={stylingMode}
        value={value || new Date()}
        name={name}
        type={type}
        onValueChanged={(e) =>
          handleChange &&
          handleChange({ name, value: e.value ? e.value : new Date() })
        }
      >
        {required && (
          <Validator>
            <RequiredRule message="هذا الحقل مطلوب" />
          </Validator>
        )}
      </DateBox>
    );
  }
);

export default withLabel(Input);
