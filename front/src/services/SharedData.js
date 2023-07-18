import { DateConvertor, DisplayNumber } from "../components/DateFunction";
import DisplayText from "../components/DisplayText/DisplayText";
import React, { useMemo, useRef } from "react";
export const seasonData = [
  {
    Id: 0,
    Name: "كلاهما",
    NameEn: "Both",
  },
  {
    Id: 1,
    Name: "الشتاء",
    NameEn: "winter",
  },
  {
    Id: 2,
    Name: "الصيف",
    NameEn: "summer",
  },
];
export const elements = [
  {
    Id: 0,
    Name: "اكسسوارات",
    NameEn: "Accessory",
  },
  {
    Id: 1,
    Name: "خامة",
    NameEn: "Material",
  },
  {
    Id: 2,
    Name: "تصميم",
    NameEn: "Design",
  },
];
export const characteristic = [
  {
    Id: 0,
    Name: "مدعى",
    NameEn: "Plaintiff",
  },
  {
    Id: 1,
    Name: "المدعى عليه",
    NameEn: "Defendant",
  },
];
export function getUniqueListBy(arr, key) {
  return arr.filter(
    (v, i, a) => a.findLastIndex((v2) => v2[key] === v[key]) === i
  );
}
export const CaseColumns = (lookups, i18n) => [
  {
    caption: "المحكمة",
    field: "CourtId",
    captionEn: "Court",
    display: "CourtName",
    value: "Id",
    data: lookups?.Courts,
    widthRatio: "100",
    dataType: "text",
  },
  {
    caption: "عميل المكتب",
    field: "ClientId",
    captionEn: "Office client",
    display: "ClientName",
    value: "Id",
    data: lookups?.Clients,
    widthRatio: "100",
    dataType: "text",
  },

  {
    caption: " رقم استئناف و الدائرة",
    field: "CircuitAndAppealNumber",
    dataType: "text",
    captionEn: "Appeal No.",
    customizeTextMain: (data) => {
      return data.value ? DisplayNumber(data.value, i18n) : "";
    },
    // customizeText: (data) => {
    //   return (
    //     <div>
    //       {data.value ? <DisplayText type={"number"} value={data.value} /> : ""}
    //     </div>
    //   );
    // },
    widthRatio: "100",
  },
  {
    caption: " رقم الدعوة و الدائرة",
    field: "CircuitAndInvitationNumber",
    dataType: "text",
    captionEn: "Invitation number",
    customizeTextMain: (data) => {
      return data.value ? DisplayNumber(data.value, i18n) : "";
    },
    // customizeText: (data) => {
    //   return (
    //     <div>
    //       {data.value ? <DisplayText type={"number"} value={data.value} /> : ""}
    //     </div>
    //   );
    // },
    widthRatio: "100",
  },

  {
    caption: "اسم العميل",
    field: "ClientName",
    captionEn: "Client Name",
    widthRatio: "100",
    dataType: "text",
  },
  {
    caption: "صفة العميل",
    field: "ClientCharacteristic",
    captionEn: "Client Characteristic",
    display: i18n?.language === "en" ? "NameEn" : "Name",
    value: "Id",
    data: lookups?.Characteristic,
    widthRatio: "70",
    dataType: "text",
  },
  {
    caption: "اسم الخصم",
    field: "OtherSideName",
    captionEn: "Other Side Name",
    widthRatio: "100",
    dataType: "text",
  },
  {
    caption: "صفة الخصم",
    field: "OtherSideCharacteristic",
    captionEn: "Other Side Characteristic",
    display: i18n?.language === "en" ? "NameEn" : "Name",
    value: "Id",
    data: lookups?.Characteristic,
    widthRatio: "70",
    dataType: "text",
  },
  // {
  //   caption: "تاريخ الإنشاء",
  //   field: "CreatedDate",
  //   dataType: "date",
  //   captionEn: "Created Date",
  //   customizeText: (data) => {
  //     return (
  //       <div>
  //         {data.value ? <DisplayText type={"date"} value={data.value} /> : ""}
  //       </div>
  //     );
  //   },
  //   widthRatio: "250",
  // },
  // {
  //   caption: "تاريخ التحديث",
  //   field: "UpdateDate",

  //   dataType: "text",
  //   captionEn: "Update Date",
  //   customizeTextMain: (data) => {
  //     return DateConvertor(data.value, i18n);
  //   },
  //   widthRatio: "200",
  // },
  {
    caption: "موضوع الدعوة",
    field: "Subject",
    captionEn: "Subject",
    widthRatio: "150",
  },
  {
    caption: "الجلسات",
    field: "Result",
    captionEn: "Result",
    widthRatio: "250",
    customizeTextMain: (data) => {
      return data.value ? DisplayNumber(data.value, i18n) : "";
    },
  },
  {
    caption: "ملحوظة",
    field: "Note",
    captionEn: "Note",
    widthRatio: "100",
  },
];
