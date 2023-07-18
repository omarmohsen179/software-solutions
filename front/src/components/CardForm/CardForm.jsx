import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, CardHeader } from "reactstrap";

const CardForm = ({
  title,
  onSubmit,
  children,
  loading = false,
  height = "500px",
}) => {
  const { t, i18n } = useTranslation();
  return (
    <Card className="card-user">
      <CardHeader>
        <h4>{t(title)}</h4>
      </CardHeader>
      <CardBody>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          style={{
            height: height,
            overflowY: "auto",
            overflowX: "hidden",
            padding: 10,
          }}
        >
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "black",
              }}
            >
              <div
                className="loader_x_form spinner-border "
                style={{
                  color: "black",
                }}
                role="status"
              >
                <span
                  style={{
                    color: "black",
                  }}
                  className="sr-only"
                >
                  Loading...
                </span>
              </div>
            </div>
          ) : (
            children
          )}
        </form>
      </CardBody>
    </Card>
  );
};

export default CardForm;
