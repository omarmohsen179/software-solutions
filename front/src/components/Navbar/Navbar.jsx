import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Navbar, NavbarBrand } from "reactstrap";
import { routes } from "../../layout/Routes";
import { RemoveFromLocalStorage } from "../../services/localStorageService";
import { userLoginLocalStorage } from "../../store/AuthReducer";
const Header = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef(null);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };

  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName + "";
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current && sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current &&
        sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);
  return (
    // add or remove classes depending if we are on full-screen-maps page or not

    <div
      color={
        window.location.pathname.indexOf("full-screen-maps") !== -1
          ? "dark"
          : color
      }
      expand="lg"
      className={
        "navbar-absolute fixed-top navbar-transparent  navbar navbar-expand-lg bg-transparent"
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>{t(getBrand())}</div>

            <div
              onClick={() => {
                dispatch(userLoginLocalStorage(null));
                RemoveFromLocalStorage();
                history.push("/");
              }}
              style={{ padding: "0 10px" }}
            >
              <i className="fas fa-sign-out-alt" />
            </div>
          </NavbarBrand>
        </div>
      </Container>
    </div>
  );
};

export default Header;
