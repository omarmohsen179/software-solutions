import React from "react";
import Header from "./components/Header";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import Benefits from "./components/Benefits";
import AdsSection from "./components/AdsSection";
import ContactUs from "./components/ContactUs";
import FAQ from "./components/FAQ";
import { useState } from "react";
import { useEffect } from "react";
import { HOME_DATA } from "./Home.Api";
import { data_all_selector } from "../../store/DataReducer";
import { useSelector } from "react-redux";

export default function Home() {
  const tempData = {
    Headers: [],
    Benefits: [
      {
        Id: 1,
        Title: "عنوان",
        TitleEn: "title",
        Description: "وصف",
        DescriptionEn: "Description",
        ImagePath: "\\temp.png",
        Active: true,
        Rank: 0,
      },
      {
        Id: 2,
        Title: "عنوان",
        TitleEn: "title",
        Description: "وصف",
        DescriptionEn: "Description",
        ImagePath: "\\temp.png",
        Active: true,
        Rank: 0,
      },
      {
        Id: 3,
        Title: "عنوان",
        TitleEn: "title",
        Description: "وصف",
        DescriptionEn: "Description",
        ImagePath: "\\temp.png",
        Active: true,
        Rank: 0,
      },
    ],
    Member: [],
    Partners: [
      {
        Id: 1,
        Title: "عنوان",
        TitleEn: "title",
        Description: "وصف",
        DescriptionEn: "Description",
        Link: "/",
        ImagePath: "\\temp.png",
        Active: true,
        Rank: 0,
      },
      {
        Id: 2,
        Title: "عنوان",
        TitleEn: "title",
        Description: "وصف",
        DescriptionEn: "Description",
        Link: "/",
        ImagePath: "\\temp.png",
        Active: true,
        Rank: 0,
      },
      {
        Id: 3,
        Title: "عنوان",
        TitleEn: "title",
        Description: "وصف",
        DescriptionEn: "Description",
        Link: "/",
        ImagePath: "\\temp.png",
        Active: true,
        Rank: 0,
      },
    ],
    Services: [
      {
        Id: 1,
        Title: "RPA Services",
        TitleEn: "RPA Services",
        Description: null,
        DescriptionEn: null,
        Link: null,
        ImagePath: "\\Uplode\\ss1.png",
        Active: true,
        Rank: 0,
      },
      {
        Id: 2,
        Title: "WE Software™",
        TitleEn: "WE Software™",
        Description: null,
        DescriptionEn: null,
        Link: null,
        ImagePath: "\\Uplode\\ss2.png",
        Active: true,
        Rank: 0,
      },
      {
        Id: 3,
        Title: "After-Sales Solutions",
        TitleEn: "After-Sales Solutions",
        Description: null,
        DescriptionEn: null,
        Link: null,
        ImagePath: "\\Uplode\\ss3.png",
        Active: true,
        Rank: 0,
      },
      {
        Id: 4,
        Title: "Web Development",
        TitleEn: "Web Development",
        Description: null,
        DescriptionEn: null,
        Link: null,
        ImagePath: "\\Uplode\\ss4.png",
        Active: true,
        Rank: 0,
      },
    ],
    Questions: [
      {
        Id: 1,
        QuestionText: "نص السؤال",
        QuestionTextEn: "What we use?",
        Active: true,
        AnswerEn:
          "GSA Analytics is using the latest technology and programming to provides the best solution, Machine learning, robotic process automation, Database management system.",
        Answer:
          "GSA Analytics is using the latest technology and programming to provides the best solution, Machine learning, robotic process automation, Database management system.",
        Rank: 0,
      },
      {
        Id: 2,
        QuestionText: "نص السؤال",
        QuestionTextEn: "Why to choose GSA Analytics?",
        Active: true,
        AnswerEn:
          "We are a Software development team focusing on Digital transformation using Business Applications, RPA Automation, Cloud, and Analytics. We are helping small to medium organization build their Web Application SW which customized and fit with their needs using a variety of new technology tools to help them improve business efficiency and profitability.",
        Answer:
          "We are a Software development team focusing on Digital transformation using Business Applications, RPA Automation, Cloud, and Analytics. We are helping small to medium organization build their Web Application SW which customized and fit with their needs using a variety of new technology tools to help them improve business efficiency and profitability.",
        Rank: 0,
      },
    ],
    Branches: [
      {
        Id: 1,
        Country: "بلد",
        City: "وصف",
        Address: "عنوان",
        CountryEn: "Country",
        CityEn: "City",
        AddressEn: "Address",
        Numbers: [
          {
            Id: 1,
            PhoneNumber: "0100000000",
            PhoneNumberEn: "0100000000",
            Active: true,
            BranchId: 1,
            Rank: 0,
          },
        ],
        Active: true,
        Rank: 0,
      },
    ],
    Social: [
      {
        Id: 1,
        Link: "Home",
        Type: "fab fa-facebook-f",
      },
      {
        Id: 2,
        Link: "Home",
        Type: "fab fa-twitter",
      },
      {
        Id: 3,
        Link: "Home",
        Type: "fab fa-instagram",
      },
      {
        Id: 4,
        Link: "Home",
        Type: "fab fa-linkedin-in",
      },
      {
        Id: 5,
        Link: "Home",
        Type: "Video",
      },
    ],
    Sections: [
      {
        Id: 1,
        SectionName: "Home",
        Title: "Header",
        Text: [
          {
            Id: 1,
            Title: " Digital Transformation",
            TitleEn: " Digital Transformation",
            Content:
              "At Custom Solutions Analytics, we unlock your business transformation for more efficiency and profitability.",
            ContentEn:
              "At Custom Solutions Analytics, we unlock your business transformation for more efficiency and profitability.",
            ImagePath: null,
            SectionId: 1,
          },
        ],
        Image: null,
      },
      {
        Id: 2,
        SectionName: "Home",
        Title: "About Us",
        Text: [
          {
            Id: 2,
            Title: "About Custom Solutions Analytics",
            TitleEn: "About Custom Solutions Analytics",
            Content:
              "We are a Software development team focusing on Digital transformation using Business Applications, RPA Automation, Cloud, and Analytics. We are helping small to medium organization build their Web Application SW which customized and fit with their needs using a variety of new technology tools to help them improve business efficiency and profitability",
            ContentEn:
              "We are a Software development team focusing on Digital transformation using Business Applications, RPA Automation, Cloud, and Analytics. We are helping small to medium organization build their Web Application SW which customized and fit with their needs using a variety of new technology tools to help them improve business efficiency and profitability",
            ImagePath: null,
            SectionId: 2,
          },
        ],
        Image: null,
      },
    ],
  };
  const selector = useSelector(data_all_selector);
  const [data, setData] = useState({
    Benefits: [],
    Partners: [],
    Services: [],
    Questions: [],
    Sections: [],
  });
  // useEffect(() => {
  //   if (selector != null) setData(selector);
  // }, [selector]);
  useEffect(() => {
    HOME_DATA()
      .then((res) => setData(res))
      .catch((err) => {});
  }, []);
  return (
    <>
      <Header
        data={data.Sections.filter((e) => e.Title == "Header")?.flatMap(
          (e) => e?.Text
        )}
      />
      <div id="main-content">
        <div id="main-page-content">
          <Services data={data.Services} />
          <AboutUs
            data={data.Sections.filter((e) => e.Title == "About Us")?.flatMap(
              (e) => e?.Text
            )}
          />
          <Benefits data={data.Benefits} />
          <AdsSection />
          <FAQ data={data.Questions} />
          <ContactUs />
        </div>
      </div>
    </>
  );
}
