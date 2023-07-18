import REQUEST from "../../services/Request";

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
export const BRANCHES_INSERT = async (e,data) => {
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
