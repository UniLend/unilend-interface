import { initStore } from "./store";

const configureSettingStore = () => {
  const actions = {
    THEME_CHANGE: (curState: any, payload: any) => {
      if (curState.theme === "dark") {
        localStorage.setItem("theme", "light");
        return { theme: "light" };
      } else if (curState.theme === "light") {
        localStorage.setItem("theme", "dark");
        return { theme: "dark" };
      }
    },
  };
  initStore(actions, {
    theme: localStorage.getItem("theme") || "light",
  });
};

export default configureSettingStore;
