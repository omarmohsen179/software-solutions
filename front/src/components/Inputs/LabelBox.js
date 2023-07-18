import React from "react";
import DisplayText from "../../DisplayText/DisplayText";
import withLabel from "./withLabel";

const Input = React.memo(({ label, value, type, width = "100%" }) => {
  return (
    <p className="dx-texteditor-input" style={{ fontSize: "18px" }}>
      {type ? <DisplayText value={value} type={type} /> : value}
    </p>
  );
});

export default withLabel(Input);
