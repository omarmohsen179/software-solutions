import React, { useCallback, useEffect, useState } from "react";
import { FormGroup } from "reactstrap";
import SubmitButtons from "../../../components/Buttons/SubmitButtons";
import CardForm from "../../../components/CardForm/CardForm";
import InputTwoLanguages from "../../../components/InputTwoLanguages/InputTwoLanguages";
import { SECTION, SECTION_UPDATE } from "../../FAQ/API";
import notify from "devextreme/ui/notify";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
function Section({ page, title }) {
  const [loading, setloading] = useState(false);
  let [data, setdata] = useState({ Text: [{}, {}] });
  useEffect(() => {
    setloading(true);
    SECTION(page, title)
      .then((res) => {
        setdata(res[0]);
      })
      .catch(() => {})
      .finally(() => setloading(false));
  }, []);
  const HandleChange = useCallback(
    (value, id, lan) => {
      console.log(value, id, lan);
      setdata({
        ...data,
        Text: data.Text?.map((item) =>
          id === item.Id
            ? lan.includes("En")
              ? { ...item, [lan]: value }
              : { ...item, [lan]: value }
            : { ...item }
        ),
      });
    },
    [data]
  );

  const OnSubmit = useCallback(
    (id) => {
      setloading(true);
      SECTION_UPDATE(data)
        .then((res) => {
          notify("Updated successfuly", "success", 3000);
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
      <CardForm title=" Section" loading={loading}>
        {data.Text.map((e) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              OnSubmit();
            }}
          >
            {" "}
            <FormGroup>
              <InputTwoLanguages
                id="Title"
                label={"Title"}
                onValueChange={({ value, name }) =>
                  HandleChange(value, e.Id, name)
                }
                value={e.Title}
                valueEn={e.TitleEn}
              />
            </FormGroup>
            <FormGroup>
              <InputTwoLanguages
                id="Content"
                label={"Description"}
                onValueChange={({ value, name }) =>
                  HandleChange(value, e.Id, name)
                }
                value={e.Content}
                valueEn={e.ContentEn}
              />
            </FormGroup>
            <ButtonComponent
              onClick={OnSubmit}
              type={"button"}
              title={"Save"}
            />
          </form>
        ))}
      </CardForm>
    </div>
  );
}

export default Section;
