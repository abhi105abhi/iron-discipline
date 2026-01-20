const STORAGE_KEY = "ironData";

export function initData() {
  let raw = localStorage.getItem(STORAGE_KEY);
  let data;
  if (!raw) {
    data = {
      habits: [],
      startDate: new Date().toISOString(),
      lifetimeAccess: false
    };
  } else {
    data = JSON.parse(raw);
    if (!data.startDate) data.startDate = new Date().toISOString();
    if (data.lifetimeAccess === undefined) data.lifetimeAccess = false;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
