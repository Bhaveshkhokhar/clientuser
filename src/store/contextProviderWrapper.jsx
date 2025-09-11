import ChefProvider from "./ChefdataStore";
import ServiceProvider from "./ServicedataStore";
import BookingProvider from "./BookingStore";
import BookingHistoryProvider from "./BookingHistoryStore";
// import { UserProvider } from "./UserdataStore";

const AppContextProvider = ({ children }) => {
  return (
    <ServiceProvider>
      <ChefProvider>
        <BookingHistoryProvider>
          <BookingProvider>{children}</BookingProvider>
        </BookingHistoryProvider>
      </ChefProvider>
    </ServiceProvider>
  );
};
export default AppContextProvider;
