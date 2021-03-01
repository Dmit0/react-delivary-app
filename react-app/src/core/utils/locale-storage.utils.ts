export const getLocaleStorageItem = (key: string, defaultReturnValue = '') => {
  try {
    return JSON.parse(localStorage.getItem(key) || `${defaultReturnValue}`);
  } catch (e) {
    console.log(e);
  }
}

export const setLocaleStorageItem = (key: string, value: any) => {
  try {
    return localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const removeLocaleStorageItem = (key: string) => {
  try {
    return localStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};