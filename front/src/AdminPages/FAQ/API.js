import REQUEST from "../../services/Request";

export const QUESTIONS = async (e, status) => {
  return await REQUEST({
    method: "get",
    url: "Question/admin",
  });
};
export const SECTION = async (page, title) => {
  return await REQUEST({
    method: "get",
    url: "Section/" + page + "/" + title,
  });
};
export const SECTION_UPDATE = async (e) => {
  return await REQUEST({
    method: "put",
    url: "Section/unformal",
    data: e,
  });
};
export const QUESTIONS_INSERT = async (e) => {
  return await REQUEST({
    method: "post",
    url: "Question",
    data: e,
  });
};
export const QUESTIONS_UPDATE = async (e) => {
  return await REQUEST({
    method: "put",
    url: "Question",
    data: e,
  });
};
export const QUESTIONS_DELETE = async (id) => {
  return await REQUEST({
    method: "delete",
    url: "Question/" + id,
  });
};
export const VIDEO_SECTION = async () => {
  return await REQUEST({
    method: "get",
    url: "Social/admin/Video",
  });
};
export const QUESTIONS_ORDER = async (e) => {
  return await REQUEST({
    method: "post",
    url: "Question/Order",
    data: e,
  });
};
