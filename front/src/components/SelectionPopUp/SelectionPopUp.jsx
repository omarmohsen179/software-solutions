import { DropDownBox } from "devextreme-react";
import React from "react";
import { useTranslation } from "react-i18next";
import MasterTable from "../masterTable/MasterTable";

function SelectionPopUp({
  values,
  onSelectionChange,
  columnAttributes,
  button_title,
  dataLabel,
  data,
}) {
  const { t } = useTranslation();
  const dataGridRender = () => {
    return (
      <div>
        <MasterTable
          dataSource={data}
          keyExpr={"Id"}
          colAttributes={columnAttributes}
          filterRow
          //  onRowDoubleClick={handleDoubleClick}
          height={"300px"}
          columnChooser={true}
          selectionMode="multiple"
          allowSelectAllMode="allPages"
          showCheckBoxesMode="always"
          allowDelete={false}
          onSelectionChanged={(e) => {
            onSelectionChange(e.selectedRowKeys);
          }}
          selectedRowKeys={values}
        />
      </div>
    );
  };

  // To set the id of the selected row in it to enable deleting or editing on clicking ok.
  return (
    <div
      className="w-100 grid-container"
      style={{ margin: "10px 0" }}
      dir="auto"
    >
      <DropDownBox
        value={values}
        valueExpr="Id"
        displayExpr={dataLabel}
        deferRendering={false}
        placeholder={t(button_title)}
        showClearButton={true}
        dataSource={data ?? []}
        onValueChanged={(e) => onSelectionChange(e.value || [])}
        contentRender={dataGridRender}
      />
    </div>
  );
}

export default React.memo(SelectionPopUp);
