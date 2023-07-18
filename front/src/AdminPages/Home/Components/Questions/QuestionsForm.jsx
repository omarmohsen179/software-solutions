import React from "react";
import { useTranslation } from "react-i18next";
import { FormGroup } from "reactstrap";
import InputTwoLanguages from "../../../../components/InputTwoLanguages/InputTwoLanguages";
import { CheckBox } from "../../../../components/Inputs";
import TextEditorTwoLanguages from "../../../../components/TextEditorTwoLanguages/TextEditorTwoLanguages";

function QuestionsForm({
  data,
  HandleChange,
  handleGetImages,
  handleRemoveImage,
}) {
  const { t } = useTranslation();

  return (
    <div style={{ width: "100%" }}>
      <FormGroup>
        <InputTwoLanguages
          id="QuestionText"
          label={"Question"}
          onValueChange={HandleChange}
          value={data?.QuestionText}
          valueEn={data?.QuestionTextEn}
        />
      </FormGroup>
      <FormGroup>
        <TextEditorTwoLanguages
          id="Answer"
          label={"Answer"}
          onValueChange={HandleChange}
          valueEn={data.AnswerEn}
          value={data.Answer}
        />
      </FormGroup>
      <div className="row">
        <div className="col">
          <FormGroup>
            <CheckBox
              label={t("Active")}
              value={data?.Active || false}
              name="Active"
              handleChange={HandleChange}
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
}

export default QuestionsForm;
