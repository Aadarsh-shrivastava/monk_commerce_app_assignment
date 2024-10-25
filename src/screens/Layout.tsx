import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import HomeScreen from "./HomeScreen/HomeScreen";

function Layout() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Layout;
