export const getTheServices = async (signal) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/service`,
      signal,
    );
    const data = await response.json();
    return mapServerServicesToLocalServices(data);
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      console.error("Fetch error:", err);
    }
  }
};
const mapServerServicesToLocalServices = (serverServices) => {
  typeof serverServices;
  return serverServices.map((service) => {
    return {
      id: service._id,
      pic: service.image,
      type: service.type,
      description: service.description,
    };
  });
};
