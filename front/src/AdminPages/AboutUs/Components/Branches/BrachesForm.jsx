import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FormGroup } from "reactstrap";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import CheckBox from "../../../../components/Inputs/CheckBox";
import InputTwoLanguages from "../../../../components/InputTwoLanguages/InputTwoLanguages";
import NumbersList from "./NumbersList";
function BranchesForm({
  data,
  HandleChange,
  handleGetImages,
  handleRemoveImage,
}) {
  const NumberDefualtValues = useRef({
    Id: 0,
    PhoneNumber: "",
    Active: false,
    BranchId: 0,
  });

  const HandleChangeNumbers = useCallback(
    (value) => {
      HandleChange(value, "Numbers");
    },
    [HandleChange]
  );
  let counter = useRef(0);
  let NewDefinion = useCallback(() => {
    if (!data.Numbers) {
      data.Numbers = [{ ...NumberDefualtValues.current }];
    } else {
      counter.current -= 1;
      data.Numbers?.push({
        ...NumberDefualtValues.current,
        Id: counter.current,
      });
    }
    HandleChange(data.Numbers, "Numbers");
  }, [data, HandleChange]);
  const { t } = useTranslation();
  return (
    <div style={{ width: "100%" }}>
      <FormGroup>
        <InputTwoLanguages
          id="Country"
          label={"Country"}
          onValueChange={HandleChange}
          value={data?.Country}
          valueEn={data?.CountryEn}
        />
      </FormGroup>
      <FormGroup>
        <InputTwoLanguages
          id="City"
          label={"City"}
          onValueChange={HandleChange}
          value={data?.City}
          valueEn={data?.CityEn}
        />
      </FormGroup>
      <FormGroup>
        <InputTwoLanguages
          id="Address"
          label={"Address"}
          onValueChange={HandleChange}
          value={data?.Address}
          valueEn={data?.AddressEn}
        />
      </FormGroup>

      <FormGroup>
        <CheckBox
          label={t("Active")}
          value={data?.Active || false}
          name="Active"
          handleChange={HandleChange}
        />
      </FormGroup>
      <NumbersList data={data.Numbers} setdata={HandleChange} />
      <ButtonComponent onClick={NewDefinion} icon={"fas fa-plus"} />
    </div>
  );
}

export default BranchesForm;
