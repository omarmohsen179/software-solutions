import REQUEST from "../../services/Request";

export const HOME_DATA = async () => {
  return await REQUEST({
    url: "Home/All",
    method: "GET",
  });
};
