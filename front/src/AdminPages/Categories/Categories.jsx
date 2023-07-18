import { useRef } from "react";
import CrudComponent from "../../components/CrudComponent/CrudComponent";
import {
  CATEGORIES,
  CATEGORY_DELETE,
  CATEGORY_INSERT,
  CATEGORY_ORDER,
  CATEGORY_UPDATE,
} from "./Categories.Api";
import CategoryCard from "./Components/CategoryCard";
import CategoryForm from "./Components/CategoryForm";

function Categories() {
  let defaultValues = useRef({
    Id: 0,
    Title: "",
    TitleEn: "",
    Description: "",
    DescriptionEn: "",
    ImagePath: "",
    Image: null,
    Active: false,
    FullWidth: false,
    SuperCategoryId: 1,
  });
  return (
    <div className="content">
      <CrudComponent
        GET={CATEGORIES}
        INSERT={CATEGORY_INSERT}
        UPDATE={CATEGORY_UPDATE}
        DELETE={CATEGORY_DELETE}
        ORDER={CATEGORY_ORDER}
        defaultValues={defaultValues}
        CardComponent={CategoryCard}
        ElementForm={CategoryForm}
        title="Categories"
      />
    </div>
  );
}

export default Categories;
