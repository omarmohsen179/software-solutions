import REQUEST from "../../services/Request";

export const POSTS = async () => {
  return await REQUEST({
    url: "Post/admin",
    method: "GET",
  });
};
export const POSTS_INSERT = async (e) => {
  return await REQUEST({
    method: "post",
    url: "Post",
    data: e,
  });
};
export const POSTS_UPDATE = async (e) => {
  return await REQUEST({
    method: "put",
    url: "Post",
    data: e,
  });
};
export const POSTS_DELETE = async (id) => {
  return await REQUEST({
    method: "delete",
    url: "Post/" + id,
  });
};
