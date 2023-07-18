import { useCallback } from "react";
import { ApiBaseUrl } from "../../../../services/config";
import { useState } from "react";
import { useEffect } from "react";
import CrudComponent from "../../../../components/CrudComponent/CrudComponent";
import {
  ITEMS,
  ITEM_DELETE,
  ITEM_FILS,
  ITEM_FILS_DELETE,
  ITEM_FILS_INSERT,
  ITEM_FILS_ORDER,
  ITEM_FILS_UPDATE,
  ITEM_INSERT,
  ITEM_ORDER,
  ITEM_UPDATE,
} from "../../Items.Api";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ItemFilesForm from "../ItemFiles/ItemFilesForm";
import ItemFilesCard from "../ItemFiles/ItemFilesCard";
import { FormGroup } from "reactstrap";
import { SelectBox } from "../../../../components/Inputs";
function ItemFiles({ res, status, Id }) {
  const [items, setitems] = useState([]);
  let defaultValuesItemsFiles = useRef({
    Id: 0,
    ImagePath: "",
    ItemId: 0,
    Active: false,
  });
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    ITEMS().then((e) => setitems(e));
  }, []);

  const { t } = useTranslation();
  const DropDownItems = () => (
    <FormGroup>
      <SelectBox
        label={t("Item")}
        dataSource={items}
        keys={{ id: "Id", name: "Title", nameEn: "TitleEn" }}
        value={selected}
        name="Id"
        handleChange={(value, name) => setSelected(value)}
      />
    </FormGroup>
  );
  return (
    <CrudComponent
      GET={ITEM_FILS}
      INSERT={ITEM_FILS_INSERT}
      UPDATE={ITEM_FILS_UPDATE}
      DELETE={ITEM_FILS_DELETE}
      ORDER={ITEM_FILS_ORDER}
      HeaderComponent={DropDownItems}
      HeaderVariable={selected}
      HeaderVariableName="ItemId"
      defaultValues={defaultValuesItemsFiles}
      CardComponent={ItemFilesCard}
      ElementForm={ItemFilesForm}
      title="Item files"
      add={selected > 0}
    />
  );
}

export default ItemFiles;
