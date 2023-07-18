export function StoreToLocalStorage(key, value) {
  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    ...value,
    ExpiresOn: new Date(value.ExpiresOn).getTime(),
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function GetFromLocalStorage(key) {
  const itemStr = localStorage.getItem("user-auth");
  // if the item doesn't exist, return {}
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiresOn) {
    // If the item is expired, delete the item from storage
    // and return {}
    localStorage.removeItem(key);
    return {};
  }
  return item;
}

export function RemoveFromLocalStorage(key) {
  localStorage.removeItem("user-auth");
}
