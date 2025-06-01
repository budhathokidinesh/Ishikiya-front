export const getOrCreateGuestId = () => {
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = crypto.randomUUID(); // or use another unique ID generator
    localStorage.setItem("guestId", guestId);
  }
  return guestId;
};
