import REQUEST from "../../services/Request";

export const CATEGORIES = async () => {
  return await REQUEST({
    method: "get",
    url: "Category/admin",
  });
};
export const CATEGORIES_USER = async () => {
  return await REQUEST({
    method: "get",
    url: "Category",
  });
};
export const HOME_CATEGORIES_SUBMIT = async (e) => {
  return await REQUEST({
    method: "post",
    url: "Header/Order",
    data: e,
  });
};
export const HOME_CATEGORIES_ADMIN = async (data) => {
  return await REQUEST({
    method: "get",
    url: "Header/admin",
  });
};
export const HOME_CATEGORIES_INSERT = async (data) => {
  return await REQUEST({
    method: "post",
    url: "Header",
    data,
  });
};
export const HOME_CATEGORIES_UPDATE = async (data) => {
  return await REQUEST({
    method: "put",
    url: "Header",
    data,
  });
};
export const HOME_CATEGORIES_DELETE = async (id) => {
  return await REQUEST({
    method: "delete",
    url: "Header/" + id,
  });
};
export const HEADER = async () => {
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
export const HEADER_ORDER = async (e) => {
  return await REQUEST({
    method: "post",
    url: "Header/Order",
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
export const BENEFITS_ORDER = async (e) => {
  return await REQUEST({
    method: "put",
    url: "Benefits/Order",
    data: e,
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
export const MEMBER_ORDER = async (e) => {
  return await REQUEST({
    method: "post",
    url: "Member/Order",
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

export const INVENTORY = async (e, status) => {
  return await REQUEST({
    method: "get",
    url: "Partener/admin",
  });
};
export const INVENTORY_INSERT = async (e) => {
  return await REQUEST({
    method: "post",
    url: "Partener",
    data: e,
  });
};
export const INVENTORY_UPDATE = async (e) => {
  return await REQUEST({
    method: "put",
    url: "Partener",
    data: e,
  });
};
export const INVENTORY_DELETE = async (id) => {
  return await REQUEST({
    method: "delete",
    url: "Partener/" + id,
  });
};
export const INVENTORY_ORDER = async (data) => {
  return await REQUEST({
    method: "post",
    url: "Partener/order",
    data,
  });
};

export const SERVICE = async (e, status) => {
  return await REQUEST({
    method: "get",
    url: "Service/admin",
  });
};
export const SERVICE_INSERT = async (e) => {
  return await REQUEST({
    method: "post",
    url: "Service",
    data: e,
  });
};
export const SERVICE_UPDATE = async (e) => {
  return await REQUEST({
    method: "put",
    url: "Service",
    data: e,
  });
};
export const SERVICE_DELETE = async (id) => {
  return await REQUEST({
    method: "delete",
    url: "Service/" + id,
  });
};
export const SERVICE_ORDER = async (e) => {
  return await REQUEST({
    method: "post",
    url: "Service",
    data: e,
  });
};
export const BRANCHES = async (e, status) => {
  return await REQUEST({
    method: "get",
    url: "Branch/admin",
  });
};
export const BRANCHES_INSERT = async (e, data) => {
  return await REQUEST({
    method: "post",
    url: "Branch",
    data: data,
  });
};
export const BRANCHES_UPDATE = async (e, data) => {
  return await REQUEST({
    method: "put",
    url: "Branch",
    data: data,
  });
};
export const BRANCHES_DELETE = async (id) => {
  return await REQUEST({
    method: "delete",
    url: "Branch/" + id,
  });
};
export const BRANCHES_ORDER = async (data) => {
  return await REQUEST({
    method: "delete",
    url: "Branch/Order",
    data,
  });
};
export const NUMBER_DELETE = async (id) => {
  return await REQUEST({
    method: "delete",
    url: "Branch/number/" + id,
  });
};

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
