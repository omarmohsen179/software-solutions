import notify from "devextreme/ui/notify";
import { useCallback, useEffect, useState } from "react";
import CardForm from "../CardForm/CardForm";
import PopUpModel from "../PopUpModel/PopUpModel";

import ButtonComponent from "../ButtonComponent/ButtonComponent";
import ReOrderList from "../ReOrderList/ReOrderList";
import CrudCard from "./CrudCard";
import CrudForm from "./CrudForm";
import { useTranslation } from "react-i18next";
import "./Crud.css";
function CrudComponent({
  GET,
  INSERT,
  UPDATE,
  DELETE,
  ORDER,
  defaultValues,
  CardComponent,
  Key = "Id",
  ElementForm,
  add = true,
  HeaderComponent,
  title,
  HeaderVariable = "test",
  HeaderVariableName = "test",
}) {
  const [data, setdata] = useState([]);
  const { t, i18n } = useTranslation();
  const [popup, setpopup] = useState({ data: {}, status: false });
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (HeaderVariable > 0) {
      setloading(true);
      GET(HeaderVariable)
        .then((res) => {
          setdata(res);
        })
        .catch(() => {})
        .finally(() => setloading(false));
    }
  }, [HeaderVariable]);
  useEffect(() => {
    setloading(true);
    GET()
      .then((res) => {
        setdata(res);
      })
      .catch(() => {})
      .finally(() => setloading(false));
  }, []);
  const changedata = useCallback(
    (e) => setpopup((prev) => ({ ...prev, data: e })),
    []
  );
  const onAdd = useCallback(() => {
    console.log("add");
    setpopup({ data: defaultValues.current, status: true });
  }, []);
  const onEdit = (res) => {
    console.log("test");
    setpopup({ data: res, status: true });
  };

  const OnDelete = useCallback(
    (id) => {
      if (id <= 0) {
        notify("Error in information. select Again! ");
        return;
      }
      setloading(true);

      DELETE(id)
        .then(() => {
          let x = data.filter(function (el) {
            return el[Key] !== id;
          });
          setdata(x);
          notify("Deleted successfuly", "success", 3000);
        })
        .catch(() => {
          notify("Error in information. try again! ", "error", 3000);
        })
        .finally(() => setloading(false));
    },
    [data]
  );

  const OnSubmit = useCallback(
    async (id) => {
      let formData = new FormData();
      const databody = {
        ...popup.data,
        [HeaderVariableName]: HeaderVariable,
      };

      for (let [key, value] of Object.entries(databody)) {
        formData.append(key.toString(), value !== null ? value : "");
      }
      setloading(true);
      if (popup.data[Key] == 0) {
        INSERT(formData, databody)
          .then((res) => {
            notify("Added successfully", "success", 3000);
            data.push(res);
            changedata(res);
            setdata(data);
          })
          .catch((err) => {
            console.log(err);
            notify("Error in information. try again! ", "error", 3000);
          })
          .finally(() => setloading(false));
      } else {
        UPDATE(formData, databody)
          .then((res) => {
            notify("Updated successfully", "success", 3000);
            if (data.filter((ele) => ele[Key] == popup.data[Key]).length > 0) {
              setdata(
                data.map((ele) => {
                  return ele[Key] == popup.data[Key] ? { ...res } : { ...ele };
                })
              );
            } else {
              data.push(res);
              setdata(data);
            }
            changedata(res);
          })
          .catch((err) => {
            console.log(err);
            notify("Error in information. try again! ", "error", 3000);
          })
          .finally(() => setloading(false));
      }
    },
    [popup.data, data, HeaderVariableName, HeaderVariable, changedata]
  );

  const onPosChange = useCallback(
    (oldindex, newindex) => {
      const temp = data;

      const old = temp[oldindex];
      const newitem = temp[newindex];
      temp[newindex] = old;
      temp[oldindex] = newitem;

      setdata(temp);
    },
    [data]
  );
  const orderList = () => {
    setloading(true);
    ORDER(data)
      .then((res) => {
        notify("Updated successfully", "success", 3000);

        GET()
          .then((res) => {
            setdata(res);
          })
          .catch(() => {})
          .finally(() => setloading(false));
        //   setpopup({ data: {}, status: false });
      })
      .catch(() => {
        notify("Error in information. try again! ", "error", 3000);
      })
      .finally(() => setloading(false));
  };

  const setPopupStatus = useCallback((e) => {
    setpopup((prev) => ({ data: defaultValues.current, status: e }));
  }, []);
  return (
    <div>
      <CardForm title={title} loading={loading}>
        {HeaderComponent != null && <HeaderComponent />}

        {add && (
          <div className="Add-icon-form " onClick={onAdd}>
            <i className="far fa-plus-square"></i>
          </div>
        )}

        <ReOrderList
          Card={CrudCard}
          passed={{ onEdit, Key, OnDelete, CardComponent }}
          data={data}
          onPosChange={onPosChange}
        />
        <div>
          {ORDER != null && (
            <ButtonComponent title={"Submit"} onClick={orderList} />
          )}
        </div>
      </CardForm>
      <PopUpModel
        setdialog={setPopupStatus}
        title={t(title)}
        loading={loading}
        dailog={popup.status}
        Submit={OnSubmit}
      >
        {popup.status && (
          <CrudForm
            data={popup.data}
            setdata={changedata}
            ElementForm={ElementForm}
          />
        )}
      </PopUpModel>
    </div>
  );
}

export default CrudComponent;
