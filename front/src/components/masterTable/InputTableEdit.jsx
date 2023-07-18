import DataGrid, {
  Button,
  Column,
  ColumnChooser,
  Editing,
  Export,
  FilterRow,
  GroupItem,
  GroupPanel,
  Grouping,
  HeaderFilter,
  LoadPanel,
  Lookup,
  MasterDetail,
  Popup,
  RequiredRule,
  Scrolling,
  Summary,
  Texts,
  TotalItem,
  ColumnFixing,
} from "devextreme-react/data-grid";
import ExcelJS from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import autoTable from "jspdf-autotable";
import React from "react";
import { useTranslation } from "react-i18next";
import fonts from "./Janna.ttf";
import "./Table.css";
function InputTableEdit({
  id = "",
  disabled = false,
  selectionMode = "single",
  dataSource,
  summaryData,
  tableGroupSummary,
  colAttributes,
  allowExcel = true,
  width = "100%",
  height = "100%",
  filterRow = true,
  groupPanel = false,
  columnChooser = true,
  headerFilter = false,
  canAdd = false,
  canUpdate = false,
  canDelete = true,
  onSelectionChanged,
  onRowRemoving,
  onRowRemoved,
  Uicon = false,
  onRowUpdated,
  deleteMessage = "هل انت متأكد من حذف هذا الاختيار ؟",
  optionChanged = null,
  remoteOperations = false,
  apiMethod,
  allowPrint = true,
  apiPayload,
  onSaving,
  onRowUpdating,
  apiKey,
  onRowDoubleClick,
  mode,
  summaryItems,
  onRowInserting,
  onRowInserted,
  onSaved,
  onEditorPreparingCustom,
  onEditRowKeyChange,
  selectedRowKeys,
  onAddClick,
  MasterRenderDetail,
  pdfTitle = "",
}) {
  const { t, i18n } = useTranslation();
  function printDocument() {
    const doc = new jsPDF("l", "mm", "a4");

    doc.addFont(fonts, "Arimo", "normal");
    doc.setFont("Arimo", "normal");
    // doc.text("Example text Lorem ipsum فثسف", 40, 25);
    autoTable(doc, {
      head: [["Name", "Email", "Country"]],
      body: [
        ["يسسسس", "david@example.com", "Sweden"],
        ["Castille", "castille@example.com", "Spain"],
      ],
      headStyles: { font: "Arimo", fontStyle: "normal", align: "right" },
      styles: { font: "Arimo", fontStyle: "normal", align: "right" },
    });

    doc.save("table.pdf");
  }
  const createOuterBorder = (
    worksheet,
    start = { row: 1, col: 1 },
    end = { row: 1, col: 1 },
    borderWidth = "medium"
  ) => {
    const borderStyle = {
      style: borderWidth,
    };
    for (let i = start.row; i <= end.row; i++) {
      const leftBorderCell = worksheet.getCell(i, start.col);
      const rightBorderCell = worksheet.getCell(i, end.col);
      leftBorderCell.border = {
        ...leftBorderCell.border,
        left: borderStyle,
      };
      rightBorderCell.border = {
        ...rightBorderCell.border,
        right: borderStyle,
      };
    }

    for (let i = start.col; i <= end.col; i++) {
      const topBorderCell = worksheet.getCell(start.row, i);
      const bottomBorderCell = worksheet.getCell(end.row, i);
      topBorderCell.border = {
        ...topBorderCell.border,
        top: borderStyle,
      };
      bottomBorderCell.border = {
        ...bottomBorderCell.border,
        bottom: borderStyle,
      };
    }
  };
  const onExportingHandle = (e) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");
    // createOuterBorder(
    //   worksheet,
    //   { row: dataSource.length, col: colAttributes },
    //   { row: 5, col: 5 }
    // );
    exportDataGrid({
      component: e.component,
      worksheet,
      keepColumnWidths: false,
      // topLeftCell: { row: 2, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {},
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "Companies.xlsx"
        );
      });
    });
    e.cancel = true;
  };
  const onExporting = React.useCallback(
    (e) => {
      if (e.format == "xlsx") {
        onExportingHandle(e);
      } else {
        const doc = new jsPDF("l", "mm", "a4");
        const lastPoint = { x: 0, y: 0 };

        doc.addFont(fonts, "Arimo", "normal");
        doc.setFont("Arimo", "normal");
        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: e.component,
          topLeft: { x: 1, y: 15 },
          autoFilterEnabled: true,
          customDrawCell({ rect }) {
            if (lastPoint.x < rect.x + rect.w) {
              lastPoint.x = rect.x + rect.w;
            }
            if (lastPoint.y < rect.y + rect.h) {
              lastPoint.y = rect.y + rect.h;
            }
          },
        }).then(() => {
          const header = pdfTitle;
          const pageWidth = doc.internal.pageSize.getWidth();
          // doc.setFontSize(15);
          const headerWidth = doc.getTextDimensions(header).w;
          doc.text(header, (pageWidth - headerWidth) / 2, 20);

          const footer = "";
          // doc.setFontSize(9);
          // doc.setTextColor("#cccccc");
          // const footerWidth = doc.getTextDimensions(footer).w;
          // doc.text(footer, lastPoint.x - footerWidth, lastPoint.y + 5);

          doc.save(pdfTitle + ".pdf");
        });
      }
    },
    [onExportingHandle]
  );

  const dataGridRef = React.createRef();
  const onToolbarPreparing = (e) => {
    let toolbarItems = e.toolbarOptions.items;
    // Modifies an existing item
    // toolbarItems.forEach(function (item) {
    // 	if (item.name === "exportButton") {
    // 		item.options = {
    // 			// icon: "exportxlsx",
    // 			text: "إضافة",
    // 			// onClick: function (e) {
    // 			//     // Implement custom save logic here
    // 			// },
    // 		};
    // 	}
    // });

    if (onAddClick)
      toolbarItems.push({
        widget: "dxButton",
        options: {
          icon: "add",
          hint: "إضافة",
          onClick: onAddClick,
        },
        location: "after",
      });
    // toolbarItems.push({
    //   widget: "dxButton",
    //   options: {
    //     icon: "fab fa-buffer",
    //     hint: "إضافة",
    //     onClick: printDocument,
    //   },
    //   location: "after",
    // });
  };

  return (
    <div>
      {/* <div onClick={() => printDocument()}>ffsfsf </div> */}
      <DataGrid
        // style={{ fontFamily: "myfont" }}
        disabled={disabled}
        id="gridContainer"
        width={width}
        ref={dataGridRef}
        height={height}
        onExporting={onExporting}
        selection={{ mode: selectionMode }}
        selectedRowKeys={selectedRowKeys}
        showRowLines={true}
        hoverStateEnabled={true}
        dataSource={dataSource}
        rtlEnabled={i18n.language === "ar"}
        showBorders={true}
        onRowDblClick={onRowDoubleClick}
        columnAutoWidth={true}
        allowColumnResizing={true}
        wordWrapEnabled={true}
        columnResizingMode="nextColumn"
        onSelectionChanged={onSelectionChanged}
        onRowRemoving={onRowRemoving}
        onRowRemoved={onRowRemoved}
        onRowUpdated={onRowUpdated}
        onRowUpdating={onRowUpdating}
        onSaving={onSaving}
        keyExpr={"Id"}
        onRowInserting={onRowInserting}
        onRowInserted={onRowInserted}
        onEditorPreparing={onEditorPreparingCustom}
        columnHidingEnabled={true}
        onSaved={onSaved}
        allowColumnReordering
        onToolbarPreparing={allowPrint && onToolbarPreparing}
        // onExporting={onExportingHandle}
        noDataText={t("No data")}
      >
        <FilterRow visible={filterRow} />
        <HeaderFilter visible={headerFilter} />
        <GroupPanel visible={groupPanel} />
        <ColumnFixing enabled={true} />
        <Grouping contextMenuEnabled={true} expandMode="rowClick" />
        <Scrolling mode="virtual" />
        <ColumnChooser enabled={columnChooser} />
        <Editing
          mode={mode ? "cell" : "popup"}
          useIcons={Uicon}
          allowAdding={canAdd}
          allowDeleting={canDelete}
          allowUpdating={canUpdate}

          //   onEditRowKeyChange={onEditRowKeyChange}
        >
          <Popup title="Form" showTitle={true} fullScreen={true} />
          <Texts deleteRow="حذف" confirmDeleteMessage={deleteMessage} />
        </Editing>
        <LoadPanel enabled={true} />

        {colAttributes.map((attr, index) => {
          return (
            <Column
              format={attr.dateFormat ? "M/d/yyyy" : null}
              key={index}
              customizeText={attr.customizeTextMain}
              cellRender={attr.customizeText}
              type={attr.dataType}
              dataType={attr.dataType}
              allowEditing={attr.allowEditing}
              dataField={attr.field}
              alignment={attr.alignment}
              setCellValue={(rowData, value) => {
                attr.setCellValue && attr.setCellValue(rowData, value);
                rowData[attr.field] = value;
              }}
              fixed={attr.fixed}
              caption={
                i18n.language === "ar"
                  ? attr.caption
                  : attr.captionEn ?? attr.caption
              }
              //  minWidth={attr.widthRatio ? `${attr.widthRatio}px` : "150px"}
            >
              {attr.required ? <RequiredRule /> : null}
              {attr.data ? (
                <Lookup
                  dataSource={attr.data}
                  displayExpr={attr.display}
                  valueExpr={attr.value}
                />
              ) : null}
              {attr.dataType == "buttons"
                ? attr?.buttons?.map((butt, i) => (
                    <Button
                      key={i}
                      text={butt.text}
                      // name={butt.name ? butt.name : null}
                      icon={butt.icon ? butt.icon : null}
                      cssClass={"table-button"}
                      onClick={(e) => butt.onClick(e.row.data)}
                    />
                  ))
                : null}
            </Column>
          );
        })}

        {MasterRenderDetail && (
          <MasterDetail enabled={true} component={MasterRenderDetail} />
        )}

        <Export
          enabled={true}
          // allowExportSelectedData={true}
          formats={["pdf", "xlsx"]}
          //formats={["xlsx"]}
        />
        <Summary recalculateWhileEditing={true}>
          {summaryItems &&
            summaryItems.map((item, index) => {
              return (
                <TotalItem
                  key={index}
                  column={item.column}
                  summaryType={item.summaryType}
                  valueFormat={item.valueFormat}
                  showInColumn={item.showInColumn}
                  cssClass={item.cssClass}
                  skipEmptyValues={true}
                  customizeText={item.customizeText}
                />
              );
            })}
          {tableGroupSummary &&
            tableGroupSummary.map((groupItem, i) => {
              return (
                <GroupItem
                  column={groupItem.column}
                  key={i}
                  summaryType={groupItem.summaryType}
                  showInGroupFooter={groupItem.showInGroupFooter}
                  displayFormat={groupItem.displayFormat}
                  alignByColumn={groupItem.alignByColumn}
                  showInColumn={groupItem.showInColumn}
                />
              );
            })}
        </Summary>
      </DataGrid>
    </div>
  );
}

export default React.memo(InputTableEdit);
