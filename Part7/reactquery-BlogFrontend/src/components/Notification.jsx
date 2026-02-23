import { useContext } from "react";
import { NotifContext } from "../reducers/notifReducers";

const Notification = () => {
  const { notif, notifDispatch } = useContext(NotifContext);

  if (notif === "") {
    return null;
  }

  return <div className="notification">{notif}</div>;
};

export default Notification;
