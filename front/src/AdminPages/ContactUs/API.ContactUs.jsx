import REQUEST from "../../services/Request";
export const SUBMIT_FORM = async (e) => {
  return await REQUEST({
    method: "post",
    url: "ContactUs",
    data: e,
  });
};
export const GET_CONTACT_US = async (e) => {
  return await REQUEST({
    method: "get",
    url: "ContactUs/SkipAndTake/" + e,
  });
};
export const DELETE_CONTACT_US = async (e) => {
  return await REQUEST({
    method: "delete",
    url: "ContactUs/" + e,
  });
};
