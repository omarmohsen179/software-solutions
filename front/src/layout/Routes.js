import ContactUs from "../AdminPages/ContactUs/ContactUs";
import Home from "../AdminPages/Home/Home";
export const layoutpath = "/dashboard";
export const layout = "/dashboard";
export const routes = [
  {
    path: "/home",
    name: "Home",
    icon: "fas fa-home",
    component: Home,
    layout: layout,
    key: ["Admin"],
  },
  {
    path: "/Contact-us",
    name: "Contact us",
    icon: "far fa-address-book",
    component: ContactUs,
    layout: layout,
    key: ["Admin"],
  },
];
