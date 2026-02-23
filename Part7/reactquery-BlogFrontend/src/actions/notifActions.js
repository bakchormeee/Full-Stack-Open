const setNotif = (notif) => {
  return {
    type: "CHANGE_NOTIF",
    payload: notif,
  };
};
const removeNotif = () => {
  return { type: "REMOVE_NOTIF" };
};

export default { setNotif, removeNotif };
