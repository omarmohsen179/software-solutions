import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import CrudComponent from "../../../../components/CrudComponent/CrudComponent";
import {
  HOME_CATEGORIES_ADMIN,
  HOME_CATEGORIES_DELETE,
  HOME_CATEGORIES_INSERT,
  HOME_CATEGORIES_SUBMIT,
  HOME_CATEGORIES_UPDATE,
} from "../../Home.Api";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import HomeCategoriesForm from "./HomeCategoriesForm";
import HomeCategoriesCard from "./HomeCategoriesCard";

function HomeCategories({ setloading }) {
  const { t } = useTranslation();

  // Drag and Drop

  const defaultValues = useRef({
    TitleEn: "",
    Title: "",
    CategoryId: 0,
    ImagePath: "",
    Image: "",
    Active: false,
    Rank: 0,
    FullWidth: false,
  });

  return (
    <CrudComponent
      GET={HOME_CATEGORIES_ADMIN}
      INSERT={HOME_CATEGORIES_INSERT}
      UPDATE={HOME_CATEGORIES_UPDATE}
      DELETE={HOME_CATEGORIES_DELETE}
      ORDER={HOME_CATEGORIES_SUBMIT}
      defaultValues={defaultValues}
      CardComponent={HomeCategoriesCard}
      ElementForm={HomeCategoriesForm}
      Key="CategoryId"
      title="Home Categories"
    />
  );
}

export default HomeCategories;
