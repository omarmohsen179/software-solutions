import React from "react";
import { useTranslation } from "react-i18next";
import "./style.css";
import { FormGroup } from "reactstrap";
let withLabel = (WrappedComponent) => {
  const withLabel = (props) => {
    let {
      label,
      size,
      requiredInput = false,
      width = "100%",
      labelWidth = "120px",
      direction = false,
    } = props;

    return (
      <FormGroup>
        <label style={{ padding: 5, fontSize: 15 }}>
          {label} {requiredInput && <b style={{ color: "red" }}>*</b>}
        </label>
        <WrappedComponent {...props} />
      </FormGroup>
    );
  };
  return withLabel;
};
export default withLabel;
