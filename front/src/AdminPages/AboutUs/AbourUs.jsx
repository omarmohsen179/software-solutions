import { useRef } from "react";
import CrudComponent from "../../components/CrudComponent/CrudComponent";
import {
  BRANCHES,
  BRANCHES_DELETE,
  BRANCHES_INSERT,
  BRANCHES_ORDER,
  BRANCHES_UPDATE,
  SERVICE,
  SERVICE_DELETE,
  SERVICE_INSERT,
  SERVICE_ORDER,
  SERVICE_UPDATE,
} from "./AboutUs.Api";
import "./AboutUs.css";

import Section from "../Home/Components/Section";
import ServiceCard from "./Components/Service/ServiceCard";
import ServiceForm from "./Components/Service/ServiceForm";
import {
  BENEFITS,
  BENEFITS_DELETE,
  BENEFITS_INSERT,
  BENEFITS_ORDER,
  BENEFITS_UPDATE,
  HEADER,
  HEADER_DELETE,
  HEADER_INSERT,
  HEADER_ORDER,
  HEADER_UPDATE,
  MEMBER,
  MEMBER_DELETE,
  MEMBER_INSERT,
  MEMBER_ORDER,
  MEMBER_UPDATE,
} from "../Home/Home.Api";
import MembersCard from "./Components/Members/MembersCard";
import MembersForm from "./Components/Members/MembersForm";
import BenefitCard from "./Components/Benefits/BenefitCard";
import BenefitsForm from "./Components/Benefits/BenefitsForm";
// import HeadersCard from "../Home/Components/Headers/HeadersCard";
// import HeadersForm from "../Home/Components/Headers/HeadersForm";
import BranchesForm from "./Components/Branches/BrachesForm";
import BranchCard from "./Components/Branches/BranchCard";

function AboutUs() {
  const defaultValuesPartners = useRef({
    Id: 0,
    Title: "",
    TitleEn: "",
    Description: "",
    DescriptionEn: "",
    ImagePath: "",
    Image: null,
    Active: false,
  });
  const defualtValuesBranch = useRef({
    Id: 0,
    Country: "",
    CountryEn: "",
    City: "",
    CityEn: "",
    Address: "",
    AddressEn: "",
    Numbers: [],
    Active: false,
  });
  const defualtValuesBenefits = useRef({
    Id: 0,
    Title: "",
    TitleEn: "",
    Description: "",
    DescriptionEn: "",
    ImagePath: "",
    Image: null,
    Active: false,
  });
  const defualtValuesHeader = useRef({
    Id: 0,
    Title: "",
    TitleEn: "",
    Description: "",
    DescriptionEn: "",
    ImagePath: "",
    Image: null,
    Active: false,
  });
  const defualtValuesMembers = useRef({
    Id: 0,
    MemberName: "",
    MemberNameEn: "",
    Note: "",
    NoteEn: "",
    ImagePath: "",
    Image: null,
    Active: false,
  });
  return (
    <div className="content">
      <Section />
      <CrudComponent
        GET={SERVICE}
        INSERT={SERVICE_INSERT}
        UPDATE={SERVICE_UPDATE}
        DELETE={SERVICE_DELETE}
        ORDER={SERVICE_ORDER}
        defaultValues={defaultValuesPartners}
        CardComponent={ServiceCard}
        ElementForm={ServiceForm}
        Key="Id"
        title="Our Experience"
      />
      <CrudComponent
        GET={BENEFITS}
        INSERT={BENEFITS_INSERT}
        UPDATE={BENEFITS_UPDATE}
        DELETE={BENEFITS_DELETE}
        ORDER={BENEFITS_ORDER}
        defaultValues={defualtValuesBenefits}
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
          defaultValues={defualtValuesMembers}
          CardComponent={HeadersCard}
          ElementForm={HeadersForm}
          Key="Id"
          title="How we work?"
        /> */}

      <CrudComponent
        GET={MEMBER}
        INSERT={MEMBER_INSERT}
        UPDATE={MEMBER_UPDATE}
        DELETE={MEMBER_DELETE}
        ORDER={MEMBER_ORDER}
        defaultValues={defualtValuesMembers}
        CardComponent={MembersCard}
        ElementForm={MembersForm}
        Key="Id"
        title="The Members"
      />

      <CrudComponent
        GET={BRANCHES}
        INSERT={BRANCHES_INSERT}
        UPDATE={BRANCHES_UPDATE}
        DELETE={BRANCHES_DELETE}
        ORDER={BRANCHES_ORDER}
        defaultValues={defualtValuesBranch}
        CardComponent={BranchCard}
        ElementForm={BranchesForm}
        Key="Id"
        title="Branches"
      />
    </div>
  );
}

export default AboutUs;
