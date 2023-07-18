import REQUEST from "../../services/Request";

export const ITEMS = async (e, status) => {
  return await REQUEST({
    method: "get",
    url: "item/admin",
  });
};
export const ITEMS_USER = async (id) => {
  return await REQUEST({
    method: "get",
    url: "item/category/" + id,
  });
};
export const SUPER_CATEGORIES_CATEGORIES_USER = async (id) => {
  return await REQUEST({
    method: "get",
    url: "SuperCategory/categories/" + id,
  });
};
export const ITEMS_USER_BY_ID = async (id) => {
  return await REQUEST({
    method: "get",
    url: "item/itemFiles/" + id,
  });
};
export const ITEM_INSERT = async (e, data) => {
  let formData = new FormData();
  for (let [key, value] of Object.entries(data)) {
    formData.append(key.toString(), value !== null ? value : "");
  }

  if (data.Image) {
    formData.append("Files[0].FileDetails", data.Image);
    formData.append("Files[0].FileType", "image");
  }
  if (data.Model) {
    formData.append(
      "Files[" + (data.Image ? 1 : 0) + "].FileDetails",
      data.Model
    );
    formData.append("Files[" + (data.Image ? 1 : 0) + "].FileType", "3D");
  }

  return await REQUEST({
    method: "post",
    url: "item",
    data: formData,
  });
};
export const ITEM_UPDATE = async (e, data) => {
  let formData = new FormData();
  for (let [key, value] of Object.entries(data)) {
    formData.append(key.toString(), value !== null ? value : "");
  }

  if (data.Image) {
    formData.append("Files[0].FileDetails", data.Image);
    formData.append("Files[0].FileType", "image");
  }
  if (data.Model) {
    formData.append(
      "Files[" + (data.Image ? 1 : 0) + "].FileDetails",
      data.Model
    );
    formData.append("Files[" + (data.Image ? 1 : 0) + "].FileType", "3D");
  }

  //formData.append("Files", data.Image);
  return await REQUEST({
    method: "put",
    url: "item",
    data: formData,
  });
};
export const ITEM_DELETE = async (id) => {
  return await REQUEST({
    method: "delete",
    url: "item/" + id,
  });
};
export const ITEM_ORDER = async (data) => {
  return await REQUEST({
    method: "post",
    url: "item/Order",
    data,
  });
};
export const ITEM_FILS = async (id) => {
  return await REQUEST({
    method: "get",
    url: "ItemFiles/" + id,
  });
};
export const ITEM_FILS_INSERT = async (e) => {
  return await REQUEST({
    method: "post",
    url: "ItemFiles",
    data: e,
  });
};
export const ITEM_FILS_UPDATE = async (e) => {
  return await REQUEST({
    method: "put",
    url: "ItemFiles",
    data: e,
  });
};
export const ITEM_FILS_DELETE = async (id) => {
  return await REQUEST({
    method: "delete",
    url: "ItemFiles/" + id,
  });
};
export const ITEM_FILS_ORDER = async (data) => {
  return await REQUEST({
    method: "post",
    url: "ItemFiles/Order",
    data,
  });
};
