import { Popup } from "devextreme-react";
import { Button as ButtonExpress } from "devextreme-react/button";
import { confirm } from "devextreme/ui/dialog";
import notify from "devextreme/ui/notify";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import MasterTable from "./masterTable/MasterTable";
import PopUpModel from "./PopUpModel/PopUpModel";

function EditDelete(props) {
  const {
    data, // Data Source
    columnAttributes, // Columns Names
    editDeleteStatus, // Determine if it's a delete or edit and on this adding recycle bin icon in delete case
    getEditData, // Setstate from your primary page to get on it the selected data
    close, // close function on deleteing خروج
    deleteItem, // Deleting row API ... you are to give it id only, regarding this data object has the id as "ID"
    visible,
    removeElement,
  } = props;

  // To set the id of the selected row in it to enable deleting or editing on clicking ok.
  const selectedRowID = useRef("");
  const { t, i18n } = useTranslation();

  // helpers
  // Can delete popup
  let deletedPopUp = useCallback(() => {
    notify({ message: t("Deleted Successfully"), width: 600 }, "success", 3000);
    //  close();
  }, [close]);

  // Canot delete popup

  let notDeletedpopUp = useCallback((err) => {
    notify(
      {
        message: t("This item cannot be deleted"),
        width: 600,
      },
      "error",
      3000
    );
  }, []);

  // Handelers
  // Handle selection and setting selected row id to id storage

  let HandleDelete = useCallback(
    async (event) => {
      event.cancel = true;
      deleteItem(event.data.Id)
        .then((res) => {
          removeElement(event.data.Id);
          deletedPopUp();
          event.cancel = false;
        })
        .catch((err) => {
          notDeletedpopUp();
        });
    },
    [deleteItem, deletedPopUp, notDeletedpopUp]
  );

  // Handle double click on row of the table , mostly look like handle Ok except for parameter.
  let handleDoubleClick = useCallback(
    (event) => {
      if (editDeleteStatus === "delete") {
        let result = confirm(t("Are you sure you want to delete this check?"));
        result.then((dialogResult) => dialogResult && HandleDelete(event));
      } else {
        getEditData(event.data);
        close();
      }
    },
    [editDeleteStatus, close, t, HandleDelete, getEditData]
  );

  // handle delete function depending on id of row "on clicking on recycle bin icon"
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <PopUpModel
      title={editDeleteStatus == "edit" ? t("Edit") : t("Delete")}
      dailog={visible}
      setdialog={close}
      minHeight={"650px"}
    >
      <div>
        <MasterTable
          dataSource={data}
          colAttributes={columnAttributes}
          filterRow
          onRowDoubleClick={handleDoubleClick}
          height={"500px"}
          columnChooser={true}
          //  onSelectionChanged={handleSelection}
          allowDelete={editDeleteStatus === "delete" ? true : false}
          onRowRemoving={HandleDelete}
        />
        {/* {console.log("EDITDELETE")} */}

        {/*  <div
          style={{
            width: "40%",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            marginTop: "5%",
          }}
        >
           <ButtonExpress
            width={120}
            height={34}
            text={t("Cancel")}
            type="danger"
            stylingMode="contained"
            onClick={close}
          />

          <ButtonExpress
            width={120}
            height={34}
            text={t("Ok")}
            type="success"
            stylingMode="contained"
            onClick={handleOk}
        />
        </div>*/}
      </div>
    </PopUpModel>
  );
}

export default React.memo(EditDelete);
