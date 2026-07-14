const STORAGE_KEYS = {
  STUDENTS: "students",
  IS_LOGIN: "isLogin",
  LOGGED_IN_USER: "loggedInUser",
};

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch (error) {
    console.error("Storage access failed:", error);
    return null;
  }
};

const saveToStorage = (key, value) => {
  const storage = getStorage();
  if (!storage) return false;

  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Failed to save to storage:", error);
    return false;
  }
};

const readFromStorage = (key, fallback = null) => {
  const storage = getStorage();
  if (!storage) return fallback;

  try {
    const item = storage.getItem(key);
    if (item === null) return fallback;
    return JSON.parse(item);
  } catch (error) {
    console.error("Failed to read from storage:", error);
    return fallback;
  }
};

const removeFromStorage = (key) => {
  const storage = getStorage();
  if (!storage) return false;

  try {
    storage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Failed to remove from storage:", error);
    return false;
  }
};

export { STORAGE_KEYS, saveToStorage, readFromStorage, removeFromStorage };
