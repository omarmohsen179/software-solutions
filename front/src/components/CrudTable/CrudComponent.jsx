import { memo, useState } from "react";

import { routes } from "../../layout/Routes";
import CardForm from "../CardForm/CardForm";
import CrudTable from "./CrudTable";

function CrudComponent(props) {
  const { FooterComponent, MasterRenderDetail, validation, columnAttributes } =
    props;
  const [loading, setloading] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  return (
    <CardForm
      title={
        routes.filter(
          (e) => "#" + e.layout + e.path === window.location.hash
        )[0]?.name
      }
      loading={loading}
      height="1500px"
    >
      <div style={{ height: 1000 }}>
        <CrudTable
          {...props}
          loading={loading}
          setloading={setloading}
          setSelectedId={setSelectedId}
          selectedRowKeys={[selectedId]}
        />
        {FooterComponent != null && selectedId > 0 && (
          <FooterComponent
            loading={loading}
            setloading={setloading}
            selectedId={selectedId}
          />
        )}
      </div>
    </CardForm>
  );
}

export default memo(CrudComponent);
