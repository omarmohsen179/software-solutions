import CrudComponent from "../../components/CrudComponent/CrudComponent";

import QuestionsCard from "../FAQ/Components/Questions/QuestionsCard";
import QuestionsForm from "../FAQ/Components/Questions/QuestionsForm";
import BenefitCard from "./Components/Benefits/BenefitCard";
import BenefitsForm from "./Components/Benefits/BenefitsForm";
import Section from "./Components/Section";
import ServiceCard from "./Components/Service/ServiceCard";
import ServiceForm from "./Components/Service/ServiceForm";
import {
  BENEFITS,
  BENEFITS_DELETE,
  BENEFITS_INSERT,
  BENEFITS_ORDER,
  BENEFITS_UPDATE,
  QUESTIONS,
  QUESTIONS_DELETE,
  QUESTIONS_INSERT,
  QUESTIONS_ORDER,
  QUESTIONS_UPDATE,
  SERVICE,
  SERVICE_DELETE,
  SERVICE_INSERT,
  SERVICE_ORDER,
  SERVICE_UPDATE,
} from "./Home.Api";
import "./Home.css";

function Home() {
  return (
    <div className="content">
      <Section page={"Home"} title={"Header"} />
      <CrudComponent
        GET={SERVICE}
        INSERT={SERVICE_INSERT}
        UPDATE={SERVICE_UPDATE}
        DELETE={SERVICE_DELETE}
        ORDER={SERVICE_ORDER}
        defaultValues={{
          TitleEn: "",
          Title: "",
          Link: "",
          ImagePath: "",
          Image: "",
          Active: false,
          Rank: 0,
        }}
        CardComponent={ServiceCard}
        ElementForm={ServiceForm}
        Key="Id"
        title="Service"
      />
      <Section page={"Home"} title={"About Us"} />
      <CrudComponent
        GET={BENEFITS}
        INSERT={BENEFITS_INSERT}
        UPDATE={BENEFITS_UPDATE}
        DELETE={BENEFITS_DELETE}
        ORDER={BENEFITS_ORDER}
        defaultValues={{
          Id: 0,
          Title: "",
          TitleEn: "",
          Description: "",
          DescriptionEn: "",
          ImagePath: "",
          Image: null,
          Active: false,
        }}
        CardComponent={BenefitCard}
        ElementForm={BenefitsForm}
        Key="Id"
        title="Benefits"
      />
      {/* <CrudComponent
        GET={HEADER}
        INSERT={HEADER_INSERT}
        UPDATE={HEADER_UPDATE}
        DELETE={HEADER_DELETE}
        ORDER={HEADER_ORDER}
        defaultValues={defaultValuesHeader}
        CardComponent={HeadersCard}
        ElementForm={HeadersForm}
        Key="Id"
        title="Header"
      /> */}
      <CrudComponent
        GET={QUESTIONS}
        INSERT={QUESTIONS_INSERT}
        UPDATE={QUESTIONS_UPDATE}
        DELETE={QUESTIONS_DELETE}
        ORDER={QUESTIONS_ORDER}
        defaultValues={{
          Id: 0,
          QuestionText: "",
          QuestionTextEn: "",
          Answer: "",
          AnswerEn: "",
          Active: false,
        }}
        CardComponent={QuestionsCard}
        ElementForm={QuestionsForm}
        Key="Id"
        title="Questions"
      />
    </div>
  );
}

export default Home;
