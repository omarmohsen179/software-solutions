import { useCallback } from "react";

import notify from "devextreme/ui/notify";
import { useTranslation } from "react-i18next";
import { Button, FormGroup, Input } from "reactstrap";
import { NUMBER_DELETE } from "../../AboutUs.Api";

const NumbersList = ({ data, setdata }) => {
  const { t, i18n } = useTranslation();

  let Delete = useCallback(
    async (element) => {
      if (element > 0) {
        NUMBER_DELETE(element)
          .then(() => {
            setdata(
              data.filter(function (el) {
                return el.Id !== element;
              })
            );
            notify(
              { message: t("Deleted Successfully"), width: 600 },
              "success",
              3000
            );
          })
          .catch(() => {
            notify(
              { message: t("Failed Try again"), width: 600 },
              "error",
              3000
            );
          });
      } else {
        setdata(
          data.filter(function (el) {
            return el.Id !== element;
          })
        );
      }
    },
    [data, t, setdata]
  );

  const HandleChange = (id, name, value) => {
    console.log(data);
    const numbers = data?.map((da, index) =>
      index == id ? { ...da, ["PhoneNumber"]: value } : da
    );
    console.log(numbers);
    setdata({ value: numbers, name: "Numbers" });
  };

  return (
    <>
      <div>
        {data?.map((da, index) => {
          return (
            <div>
              <div>
                <div className="row">
                  <div className="col">
                    <FormGroup>
                      <label style={{ fontSize: "20px" }}>
                        {t("Phone number")}
                      </label>
                      <Input
                        id={"PhoneNumber"}
                        value={da?.PhoneNumber}
                        onChange={(e) =>
                          HandleChange(index, e.target.id, e.target.value)
                        }
                        name="PhoneNumber"
                        type="text"
                      />
                    </FormGroup>
                  </div>
                </div>

                <div
                  className="row"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="col">
                    <Button
                      className="btn btn btn-danger col-12"
                      onClick={() => Delete(da.Id)}
                      // disabled={da.id <= 0}
                      //  onClick={Dele}
                    >
                      -
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NumbersList;
