import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

import "./assets/css/global.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { PhotoProvider } from "./context/PhotoContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <PhotoProvider>
          <AppRoutes />
        </PhotoProvider>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
