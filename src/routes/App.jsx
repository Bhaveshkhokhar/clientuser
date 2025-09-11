import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LogininfoContextProvider from "../store/authStore";
import AppContextProvider from "../store/contextProviderWrapper";
import UserProvider from "../store/UserdataStore";
const App = () => {
  console.log("app");
  return (
    <LogininfoContextProvider>
      <UserProvider>
      <Header />
      <AppContextProvider>
        <Outlet  />
      </AppContextProvider>
      <Footer />
      </UserProvider>
    </LogininfoContextProvider>
  );
};
export default App;
