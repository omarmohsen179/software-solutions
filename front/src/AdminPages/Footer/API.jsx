import REQUEST from "../../services/Request";

export const SOCIAL = async (e, status) => {
  return await REQUEST({
    method: "get",
    url: "Social",
  });
};
export const SOCIAL_UPDATE = async (e) => {
  return await REQUEST({
    method: "put",
    url: "Social",
    data: e,
  });
};
