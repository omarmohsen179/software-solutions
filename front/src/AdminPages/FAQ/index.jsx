import React from "react";
import Section from "./Components/Section";
import CrudComponent from "../../components/CrudComponent/CrudComponent";
import {
  QUESTIONS,
  QUESTIONS_DELETE,
  QUESTIONS_INSERT,
  QUESTIONS_ORDER,
  QUESTIONS_UPDATE,
} from "./API";
import { useRef } from "react";
import QuestionsCard from "./Components/Questions/QuestionsCard";
import QuestionsForm from "./Components/Questions/QuestionsForm";

function FAQ() {
  let defualtValues = useRef({
    Id: 0,

    QuestionText: "",
    QuestionTextEn: "",
    Answer: "",
    AnswerEn: "",
    Active: false,
  });
  return (
    <div className="content">
      <Section />
      <CrudComponent
        GET={QUESTIONS}
        INSERT={QUESTIONS_INSERT}
        UPDATE={QUESTIONS_UPDATE}
        DELETE={QUESTIONS_DELETE}
        ORDER={QUESTIONS_ORDER}
        defaultValues={defualtValues}
        CardComponent={QuestionsCard}
        ElementForm={QuestionsForm}
        Key="Id"
        title="Questions"
      />
    </div>
  );
}

export default FAQ;
