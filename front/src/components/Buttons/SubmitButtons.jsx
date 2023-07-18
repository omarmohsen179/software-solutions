import React from "react";
import { Button, FormGroup } from "reactstrap";

const SubmitButtons = ({
  type = "submit",
  text = "Submit",
  onClick = () => {},
}) => {
  return (
    <FormGroup>
      <Button
        className="btn btn btn-success col-12"
        type={type}
        onClick={onClick}
      >
        {text}
      </Button>
    </FormGroup>
  );
};

export default SubmitButtons;
