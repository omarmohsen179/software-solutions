import React, { useCallback, useEffect, useState } from "react";
import { FormGroup, Input } from "reactstrap";
import SubmitButtons from "../../../components/Buttons/SubmitButtons";
import CardForm from "../../../components/CardForm/CardForm";
import InputTwoLanguages from "../../../components/InputTwoLanguages/InputTwoLanguages";
import { SECTION, SECTION_UPDATE, VIDEO_SECTION } from "../API";
import notify from "devextreme/ui/notify";
import { SOCIAL_UPDATE } from "../../Footer/API";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
function Section() {
  let [data, setdata] = useState({ Text: [{}, {}] });
  let [loading, setloading] = useState(false);
  let [Video, setVideo] = useState({ Text: [{}, {}] });
  useEffect(() => {
    setloading(true);
    SECTION("Works")
      .then((res) => {
        setdata(res[0]);
      })
      .catch(() => {})
      .finally(() => setloading(false));
    VIDEO_SECTION()
      .then((res) => {
        setVideo(res[0]);
      })
      .catch(() => {})
      .finally(() => setloading(false));
  }, []);
  const HandleChange = useCallback(
    (value, id, lan) => {
      console.log(lan);
      setdata({
        ...data,
        Text: data.Text?.map((item) =>
          id === item.Id
            ? lan.includes("En")
              ? { ...item, ContentEn: value }
              : { ...item, Content: value }
            : { ...item }
        ),
      });
    },
    [data]
  );

  const OnSubmit = async (id) => {
    let formData = new FormData();

    for (let [key, value] of Object.entries(data)) {
      formData.append(key.toString(), value);
    }
    setloading(true);
    await SOCIAL_UPDATE([Video])
      .then((res) => {
        notify("Updated successfuly", "success", 3000);
      })
      .catch(() => {
        notify("Error in information. try again! ", "error", 3000);
      })
      .finally(() => setloading(false));
    await SECTION_UPDATE(data)
      .then((res) => {
        notify("Updated successfuly", "success", 3000);
      })
      .catch(() => {
        notify("Error in information. try again! ", "error", 3000);
      })
      .finally(() => setloading(false));
  };
  return (
    <div style={{ width: "100%" }}>
      <CardForm title=" Section" loading={loading}>
        <form>
          <FormGroup>
            <InputTwoLanguages
              id="Content"
              label={"Title"}
              onValueChange={({ value, name }) => HandleChange(value, 3, name)}
              value={data?.Text[0]?.Content}
              valueEn={data?.Text[0]?.ContentEn}
            />
          </FormGroup>
          <FormGroup>
            <InputTwoLanguages
              id="Content"
              label={"Description"}
              onValueChange={({ value, name }) => HandleChange(value, 4, name)}
              value={data && data?.Text[1]?.Content}
              valueEn={data && data?.Text[1]?.ContentEn}
            />
          </FormGroup>
          <FormGroup>
            <label style={{ fontSize: "20px" }}>Video</label>
            <Input
              id={"Link"}
              value={Video.Link}
              onChange={(e) => setVideo({ ...Video, Link: e.target.value })}
              type="Link"
            />
          </FormGroup>
          <ButtonComponent onClick={OnSubmit} type={"button"} title={"Save"} />
        </form>
      </CardForm>
    </div>
  );
}

export default Section;
