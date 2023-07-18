import { useEffect, useRef } from "react";
import CrudComponent from "../../components/CrudComponent/CrudComponent";
import ItemCard from "./Components/Item/ItemCard";
import ItemForm from "./Components/Item/ItemForm";
import {
  ITEMS,
  ITEM_DELETE,
  ITEM_INSERT,
  ITEM_ORDER,
  ITEM_UPDATE,
} from "./Items.Api";
import ItemFiles from "./Components/Item/ItemFiles";

function Items() {
  let defaultValues = useRef({
    Id: 0,
    Title: "",
    TitleEn: "",
    Description: "",
    DescriptionEn: "",
    ImagePath: "",
    ItemModel: "",
    Model: "",
    CategoryId: 0,
    Image: null,
    Active: false,
    FullWidth: false,
  });

  return (
    <div className="content">
      <CrudComponent
        GET={ITEMS}
        INSERT={ITEM_INSERT}
        UPDATE={ITEM_UPDATE}
        DELETE={ITEM_DELETE}
        ORDER={ITEM_ORDER}
        defaultValues={defaultValues}
        CardComponent={ItemCard}
        ElementForm={ItemForm}
        title="Items"
      />
      <ItemFiles />
    </div>
  );
}

export default Items;
