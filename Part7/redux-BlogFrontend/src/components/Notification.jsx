import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification = () => {
  const message = useSelector((state) => state.notification);

  if (message === "") {
    return null;
  }

  return <Alert severity="info">{message}</Alert>;
};

export default Notification;
