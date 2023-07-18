import REQUEST from "../../services/Request";
export const SUPER_CATEGORIES = async (e, status) => {
  return await REQUEST({
    method: "get",
    url: "SuperCategory/admin",
  });
};
export const HEADER = async (e, status) => {
  return await REQUEST({
    method: "get",
    url: "Header/admin",
  });
};
export const HEADER_INSERT = async (e) => {
  return await REQUEST({
    method: "post",
    url: "Header",
    data: e,
  });
};
export const HEADER_UPDATE = async (e) => {
  return await REQUEST({
    method: "put",
    url: "Header",
    data: e,
  });
};
export const HEADER_DELETE = async (id) => {
  return await REQUEST({
    method: "delete",
    url: "/Header/" + id,
  });
};

export const BENEFITS = async (e, status) => {
  return await REQUEST({
    method: "get",
    url: "/Benefits/admin",
  });
};
export const BENEFITS_INSERT = async (e) => {
  return await REQUEST({
    method: "post",
    url: "Benefits",
    data: e,
  });
};
export const BENEFITS_UPDATE = async (e) => {
  return await REQUEST({
    method: "put",
    url: "Benefits",
    data: e,
  });
};
export const BENEFITS_DELETE = async (id) => {
  return await REQUEST({
    method: "delete",
    url: "Benefits/" + id,
  });
};
export const MEMBER = async (e, status) => {
  return await REQUEST({
    method: "get",
    url: "/Member/admin",
  });
};
export const MEMBER_INSERT = async (e) => {
  return await REQUEST({
    method: "post",
    url: "Member",
    data: e,
  });
};
export const MEMBER_UPDATE = async (e) => {
  return await REQUEST({
    method: "put",
    url: "Member",
    data: e,
  });
};
export const MEMBER_DELETE = async (id) => {
  return await REQUEST({
    method: "delete",
    url: "Member/" + id,
  });
};

export const CATEGORIES = async (e, status) => {
  return await REQUEST({
    method: "get",
    url: "/Category/admin",
  });
};
export const CATEGORIES_USER = async (e, status) => {
  return await REQUEST({
    method: "get",
    url: "/Category",
  });
};
export const CATEGORY_INSERT = async (e) => {
  return await REQUEST({
    method: "post",
    url: "Category",
    data: e,
  });
};
export const CATEGORY_UPDATE = async (e) => {
  return await REQUEST({
    method: "put",
    url: "Category",
    data: e,
  });
};
export const CATEGORY_DELETE = async (id) => {
  return await REQUEST({
    method: "delete",
    url: "Category/" + id,
  });
};
export const CATEGORY_ORDER = async (data) => {
  return await REQUEST({
    method: "post",
    url: "Category/Order",
    data,
  });
};
