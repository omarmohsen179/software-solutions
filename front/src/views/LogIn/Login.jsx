import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  auth_loading,
  userLogin,
  user_selector,
} from "../../store/AuthReducer";
import "./Login.css";
import { useTranslation } from "react-i18next";
import RadioBox from "../../components/RadioGroupList/RadioBox";
import Loader from "../../components/Loader/Loader";
import LabeledInput from "../../components/UserInput/UserInput";
function Login() {
  let dispatch = useDispatch();
  let selector = useSelector(user_selector);
  const history = useHistory();
  const { t, i18n } = useTranslation();
  let [values, setvalues] = useState({
    Username: "",
    Password: "",
    Type: 1,
    rememberMe: true,
  });

  const [loading, setLoading] = useState(false);
  let laoding_redux = useSelector(auth_loading);
  useEffect(() => {
    setLoading(laoding_redux);
  }, [laoding_redux]);
  useEffect(() => {
    if (selector != null && Object.keys(selector).length > 0) {
      history.push("/dashboard");
    }
    setLoading(false);
  }, [selector]);
  const HandleChange = useCallback((e) => {
    setvalues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  let Submit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      dispatch(await userLogin(values));
    },
    [values, history]
  );
  return (
    <div>
      <Loader loading={loading} />
      <div
        class="main-auth"
        style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
      >
        <p class="sign" align="center">
          {t("Sign In")}
        </p>
        <form class="form1" onSubmit={Submit}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              padding: 20,
            }}
          >
            {/* <RadioBox
              name="type"
              value={values.type}
              handleChange={({ name, value }) =>
                setvalues((prev) => ({ ...prev, [name]: value }))
              }
              data={[
                // { Id: 1, NameEn: "Admin", Name: "مدير الموقع" },
                { Id: "Company", NameEn: "Company", Name: "شركة" },
                { Id: "User", NameEn: "User", Name: "مستخدم" },
              ]}
            /> */}
            <LabeledInput
              name="Username"
              HandleChange={HandleChange}
              value={values.Username}
              Label={"Username"}
            />
            <LabeledInput
              name="Password"
              HandleChange={HandleChange}
              value={values.Password}
              Label={"Password"}
              type="password"
            />
            {/* <div className="login-remeber-me-checkbox">
              <input
                type="checkbox"
                name="rememberMe"
                onChange={(e) =>
                  setvalues({ ...values, rememberMe: e.target.checked })
                }
                value={values.rememberMe}
              />
              <label className="label-shared-style"> {t("Remember me")}</label>
            </div>{" "} */}
            <button class="submit" type={"submit"} align="center">
              {t("Sign In")}
            </button>
            {/* <button
              class="submit"
              type={"button"}
              onClick={() => history.push("/register")}
              align="center"
            >
              {t("Register")}
            </button> */}
            {/* <p class="forgot" align="center">
            <Link to="/forget-password" className="label-shared-style">
              {t("Forgot Password?")}
            </Link>
          </p> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
