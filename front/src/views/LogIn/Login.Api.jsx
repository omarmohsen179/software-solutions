import REQUEST from "../../services/Request";

export const LOGIN = async (e) => {
  return await REQUEST({
    url: "Auth/login",
    method: "POST",
    data: e,
  });
};
