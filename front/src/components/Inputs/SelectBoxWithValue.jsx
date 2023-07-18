import React from "react";
import { SelectBox } from "devextreme-react";
import withLabel from "./withLabel";
import { useTranslation } from "react-i18next";

const SelectBoxWithValue = React.memo(
  ({
    value,
    name,
    // [{id: "", name:"" }, ..]
    dataSource = [],
    handleChange,
    keys = { id: "id", name: "name" },
    placeholder = "قم بالاختيار",
  }) => {
    const { t, i18n } = useTranslation();
    return (
      <>
        <SelectBox
          placeholder={placeholder}
          dataSource={dataSource}
          displayExpr={keys.name}
          valueExpr={keys.id}
          defaultValue={value}
          rtlEnabled={i18n.language == "ar"}
          onValueChange={(selectedItem) =>
            handleChange({ name, value: selectedItem })
          }
          searchEnabled={true}
        />
        <h1>Value</h1>
      </>
    );
  }
);

export default withLabel(SelectBoxWithValue);
