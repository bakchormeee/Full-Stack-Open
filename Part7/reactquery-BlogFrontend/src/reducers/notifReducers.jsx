import { useReducer, createContext } from "react";

export const NotifContext = createContext();

const notifReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_NOTIF":
      return action.payload;
    case "REMOVE_NOTIF":
      return "";
    default:
      return state;
  }
};

export const NotifProvider = ({ children }) => {
  const [notif, notifDispatch] = useReducer(notifReducer, "");

  return (
    <NotifContext.Provider value={{ notif, notifDispatch }}>
      {children}
    </NotifContext.Provider>
  );
};
