import REQUEST from "../services/Request";

export const CHECK_ADMIN = async (e) => {
  return await REQUEST({
    url: "Auth/check-type",
    method: "GET",
  });
};
