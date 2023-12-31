import React from "react";
import { SelectBox } from "devextreme-react";
import withLabel from "./withLabel";
import { Validator, RequiredRule } from "devextreme-react/validator";
import { useTranslation } from "react-i18next";

const Input = React.memo(
  ({
    value,
    name,
    // [{key: "", value:"" }, ..]
    dataSource = [],
    handleChange,
    required,
    keys = { id: "id", name: "name" },
    placeholder = "قم بالاختيار",
    placeholderEn = "Please Select ..",
    stylingMode = "outlined",
    validationErrorMessage,
    readOnly = false,
    ref,
    disabled,
    defaultValue,
  }) => {
    const { t, i18n } = useTranslation();
    //https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/icons/custom-dropbutton-icon.svg
    return (
      <SelectBox
        readOnly={readOnly}
        ref={ref}
        validationMessageMode="auto"
        validationStatus={validationErrorMessage ? "invalid" : "valid"}
        validationError={{ message: validationErrorMessage }}
        stylingMode={stylingMode}
        placeholder={
          i18n.language === "ar" ? placeholder : placeholderEn ?? placeholder
        }
        dataSource={dataSource}
        displayExpr={
          i18n.language === "ar" ? keys.name : keys.nameEn ?? keys.name
        }
        valueExpr={keys.id}
        value={value}
        rtlEnabled={i18n.language === "ar"}
        disabled={disabled}
        defaultValue={defaultValue}
        onValueChange={(selectedItem) =>
          handleChange({ name, value: selectedItem })
        }
        searchEnabled={true}
        dropDownButtonRender={() => (
          <i
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              fontSize: "18px",
            }}
            className="dx-icon-spindown"
          ></i>
        )}
      >
        {required && (
          <Validator>
            <RequiredRule message="هذا الحقل مطلوب" />
          </Validator>
        )}
      </SelectBox>
    );
  }
);

export default withLabel(Input);
