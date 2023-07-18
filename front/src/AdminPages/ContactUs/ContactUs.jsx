import notify from "devextreme/ui/notify";
import { useCallback, useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import CardForm from "../../components/CardForm/CardForm";

import { DELETE_CONTACT_US, GET_CONTACT_US } from "./API.ContactUs";
import { DateConvertor } from "./DateFunction";

const ContactUs = () => {
  let [Posts, setPosts] = useState([]);
  let [Current, setCurrent] = useState(0);
  let [TotalCount, setTotalCount] = useState(0);
  let [loading, setloading] = useState(false);
  let fetch = () => {
    setloading(true);
    GET_CONTACT_US(0)
      .then((x) => {
        setCurrent(x.CurrentCount);
        setTotalCount(x.TotalCount);
        setPosts(x.Data);
      })
      .finally(() => setloading(false));
  };
  useEffect(() => {
    fetch();
    return () => {};
  }, []);

  let Delete = useCallback(
    (element) => {
      setloading(true);
      DELETE_CONTACT_US(element)
        .then(() => {
          let x = Posts.filter(function (el) {
            return el.Id !== element;
          });

          setPosts(x);
          notify(
            { message: "Deleted Successfully", width: 600 },
            "success",
            3000
          );
        })
        .catch(() => {
          notify({ message: "Failed Try again", width: 600 }, "error", 3000);
        })
        .finally(() => setloading(false));
    },
    [Posts]
  );
  return (
    <div className="content">
      <CardForm title="Contact Us" loading={loading}>
        {Posts?.map((data) => {
          return (
            <div style={{ padding: "20px" }}>
              <div
                className="row "
                style={{
                  border: "0.5px solid #e69a5c",
                  borderRadius: "20px",
                  padding: "20px",
                }}
              >
                <div className="col-8 ">
                  <div className=" titleLatestadminForm">
                    <br />
                    {"Name"} : {data.Name}
                    <br />
                    {"E-mail"} : {data.Email}
                    <br />
                    {"Phone Number"} : {data.PhoneNumber}
                    <br />
                    {"Reason"} : {data.Reason}
                    <br />
                    {"Message"} : {data.Message}
                  </div>
                  <div className=" dataForm"></div>
                </div>
                <div className="col-4">
                  <i
                    className="fas fa-backspace aboutus-deleteicon"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      Delete(data.Id);
                    }}
                  ></i>
                  <div>{DateConvertor(data.Date, true)}</div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="morePosts">
          {TotalCount !== Current ? (
            <button
              type="button"
              onClick={async () => {
                let x = await GET_CONTACT_US(Current);
                setCurrent(x.CurrentCount);
                setTotalCount(x.TotalCount);
                setPosts(x.Data);
              }}
              className="btn btn-outline-dark "
            >
              {"More Posts"}
            </button>
          ) : null}
        </div>
      </CardForm>
    </div>
  );
};

export default ContactUs;
