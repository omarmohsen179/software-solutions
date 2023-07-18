import notify from "devextreme/ui/notify";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import YesOrNoPopUp from "./YesOrNoPopUp";
import InputTableEdit from "../masterTable/InputTableEdit";
import CrudForm from "./CrudForm";

function CrudTable({
  GET,
  DELETE,
  EDIT,
  defaultValues,
  Key = "Id",
  ElementForm,
  add = true,
  title,
  columnAttributes,
  summaryItems,
  view,
  loading,
  setloading,
  setSelectedId,
  selectedId,
  selectedRowKeys = [],
  MasterRenderDetail,
  validation = () => false,
}) {
  const [data, setdata] = useState([]);
  const [cols, setCols] = useState([]);
  const { t, i18n } = useTranslation();
  const [values, setValues] = useState(defaultValues.current);
  const [popup, setPopup] = useState(false);
  const [action, setAction] = useState(false);
  useEffect(() => {
    // setloading(true);
    // setdata([]);
    console.log("Table compoinent");
    GET(selectedId)
      .then((res) => {
        setdata(res);
      })
      .catch(() => {})
      .finally(() => setloading(false));
  }, [selectedId, action]);

  const handleChange = useCallback(({ name, value }) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);
  const onAdd = useCallback(() => {
    setValues(defaultValues.current);
    setPopup(true);
  }, []);
  const onEdit = useCallback((res) => {
    setValues(res);
    setPopup(true);
  }, []);

  const OnDelete = (row) => {
    if (YesOrNo.id <= 0) {
      notify("Error in information. select Again! ");
      return;
    }
    setloading(true);
    setAction(true);
    DELETE(YesOrNo.id)
      .then(() => {
        const test = data.filter((el) => el[Key] != YesOrNo.id);

        setdata(test);
        notify(t("Deleted successfully"), "success", 3000);
      })
      .catch((e) => {
        notify("Error in information. try again! ", "error", 3000);
      })
      .finally(() => {
        setloading(false);
        setAction(false);
      });
  };

  const [YesOrNo, setYesOrNo] = useState({ id: 0, state: false });
  const OnSubmit = useCallback(
    async (id) => {
      if (validation(values)) {
        notify(t("Please Fill the inputs"), "error", 3000);
        return;
      }
      let formData = new FormData();
      for (let [key, value] of Object.entries(values)) {
        formData.append(key.toString(), value !== null ? value : "");
      }
      setloading(true);
      setAction(false);
      EDIT(values)
        .then((res) => {
          // if (values[Key] == 0) {
          //   notify("Added successfully", "success", 3000);
          //   setdata([...data, res]);
          // } else {
          //   notify("Updated successfully", "success", 3000);
          //   setdata(
          //     data.map((ele) => {
          //       return ele[Key] == values[Key] ? { ...res } : { ...ele };
          //     })
          //   );
          // }
          setAction(true);
          //setValues(res);
          setValues({ ...values, Id: 0 });
          setPopup(false);
        })
        .catch((err) => {
          console.log(err);
          notify("Error in information. try again! ", "error", 3000);
        })
        .finally(() => setloading(false));
    },
    [data, Key, values, validation]
  );

  const setPopupStatus = useCallback((e) => {
    setPopup(e);
  }, []);
  useEffect(() => {
    setCols(
      !view
        ? [
            {
              dataType: "buttons",
              //   alignment: "center",

              fixed: true,
              buttons: [
                { onClick: onEdit, icon: "fas fa-pen" },
                {
                  onClick: (row) => setYesOrNo({ id: row.Id, state: true }),
                  icon: "fas fa-trash",
                },
              ],
            },
            ...columnAttributes,
          ]
        : columnAttributes
    );
  }, [columnAttributes, setYesOrNo]);
  const setSelected = useCallback(
    (e) => setSelectedId && setSelectedId(e.selectedRowKeys[0]),
    []
  );
  const handleKeyPress = (event) => {
    console.log(event);
    if (event.key === "Enter") {
      console.log("enter press here! ");
    }
  };
  return (
    <div style={{ margin: "20px 0" }}>
      <h1 style={{ textAlign: "center" }}>{t(title)}</h1>
      {/* <CustomTablePDF fields={columnAttributes} data={data} /> */}
      <div>
        {!popup && !loading && (
          <InputTableEdit
            Uicon
            height="500px"
            pdfTitle={t(title)}
            canDelete={false}
            onSelectionChanged={setSelected}
            canUpdate={false}
            canAdd={false}
            dataSource={data}
            colAttributes={cols}
            filterRow={true}
            selectedRowKeys={selectedRowKeys}
            apiKey={"Id"}
            onAddClick={!view ? onAdd : null}
            MasterRenderDetail={MasterRenderDetail}
            //  summaryItems={summaryItems}
          />
        )}
      </div>
      <YesOrNoPopUp
        dailog={YesOrNo.state}
        setdialog={(e) => setYesOrNo({ id: 0, state: e })}
        OnDelete={OnDelete}
      />
      {!view && (
        <>
          <CrudForm
            data={values}
            handleChange={handleChange}
            ElementForm={ElementForm}
            setLoading={setloading}
            setPopupStatus={setPopupStatus}
            title={title}
            loading={loading}
            status={popup}
            Submit={OnSubmit}
          />
        </>
      )}
    </div>
  );
}

export default memo(CrudTable);
