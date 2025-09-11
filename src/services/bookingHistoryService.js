export const getBookingHistoryData = async (signal, handleuserProfile) => {
  try {
    const response = await fetch("https://serverofchefbooking.onrender.com/getYourBookingsHistory", {
      signal,
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401) {
        handleuserProfile(false);
        alert(data.message);
        return;
      }
      if (response.status === 404) {
        handleuserProfile(false);
        alert(data.message);
        return;
      }
      if (response.status === 500) {
        alert(data.message);
        return;
      }
      throw new Error("Failed to fetch userBookingdata");
    }
    return mapServerBookingHistoryToLocalBookingHistory(data.userBookingHistoryData);
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      console.error("Fetch error:", err);
    }
  }
};
const mapServerBookingHistoryToLocalBookingHistory = (serverBookingHistory) => {
  return serverBookingHistory.map((bookingHistory) => {
    return {
      bookinghistory_id: bookingHistory._id,
      chefDetail: bookingHistory.chef_id,
      date: bookingHistory.date,
      time: bookingHistory.time,
      price: bookingHistory.totalPrice,
      address: bookingHistory.Address,
      bookedAt: bookingHistory.bookedAt.slice(0, 10),
      modeOfPayment: bookingHistory.modeOfPayment,
      status:bookingHistory.status,
    };
  });
};