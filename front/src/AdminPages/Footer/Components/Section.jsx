import React, { useCallback, useEffect, useState } from "react";
import { FormGroup, Input } from "reactstrap";
import SubmitButtons from "../../../components/Buttons/SubmitButtons";
import CardForm from "../../../components/CardForm/CardForm";
import { SOCIAL, SOCIAL_UPDATE } from "../API";
import notify from "devextreme/ui/notify";
function Section() {
  let [loading, setloading] = useState(false);
  let [data, setdata] = useState([]);
  useEffect(() => {
    setloading(true);
    SOCIAL()
      .then((res) => {
        setdata(res);
      })
      .catch(() => {})
      .finally(() => setloading(false));
  }, []);
  const HandleChange = useCallback(
    (value, id) => {
      setdata(
        data?.map((item) =>
          id === item.Id ? { ...item, Link: value } : { ...item }
        )
      );
    },
    [data]
  );

  const OnSubmit = useCallback(
    (id) => {
      setloading(true);
      SOCIAL_UPDATE(data)
        .then((res) => {
          notify("Updated successfully", "success", 3000);
        })
        .catch(() => {
          notify("Error in information. try again! ", "error", 3000);
        })
        .finally(() => setloading(false));
    },
    [data]
  );
  return (
    <div style={{ width: "100%" }}>
      <CardForm title=" Social Media Links" loading={loading}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            OnSubmit();
          }}
        >
          {data?.map((item) => {
            return (
              <FormGroup>
                <label style={{ fontSize: "20px" }}>
                  <i className={item.Type}></i>
                </label>
                <Input
                  id={"Link"}
                  value={item.Link}
                  onChange={(e) => HandleChange(e.target.value, item.Id)}
                  type="Link"
                />
              </FormGroup>
            );
          })}

          <SubmitButtons onClick={OnSubmit} type={"button"} />
        </form>
      </CardForm>
    </div>
  );
}

export default Section;
