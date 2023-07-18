import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";
import { useTranslation } from "react-i18next";
import "./RadioBox.css";
const RadioBox = React.memo(({ name, value, handleChange, data }) => {
  const { t, i18n } = useTranslation();
  return (
    <p
      className="dx-texteditor-input"
      style={{ fontSize: "18px", display: "flex", alignItems: "center" }}
    >
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        className="radio-boxes"
        onChange={(e) => handleChange({ name, value: e.target.defaultValue })}
      >
        {data.map((e) => (
          <FormControlLabel
            value={e.Id}
            control={<Radio />}
            className="MuiRadio-colorPrimary"
            label={i18n.language == "en" ? e.NameEn : e.Name}
          />
        ))}
      </RadioGroup>
    </p>
  );
});

export default RadioBox;
