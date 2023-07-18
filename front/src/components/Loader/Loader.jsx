import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Loader.css";
function Loader({ loading }) {
  const { t, i18n } = useTranslation();

  return loading ? (
    <div className="loader-background">
      <div class="loading_x spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  ) : null;
}

export default React.memo(Loader);
