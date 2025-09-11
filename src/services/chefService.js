export const getTheChefs = async (signal) => {
  try {
    const response = await fetch("https://serverofchefbooking.onrender.com/get-chefs", signal);
    const data = await response.json();
    return mapServerChefsToLocalChefs(data);
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      console.error("Fetch error:", err);
    }
  }
};
const mapServerChefsToLocalChefs = (serverChefs) => {
  return serverChefs.map((chef) => {
    return {
      id: chef._id,
      pic: chef.profileImage,
      name: chef.name,
      available: chef.available,
      type: chef.type,
      rating: chef.rating,
      price: chef.price,
      speciality: chef.speciality,
      bio: chef.bio,
      experience: chef.experience,
      certifications: chef.certifications,
    };
  });
};
