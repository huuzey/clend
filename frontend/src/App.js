import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./pages/Header";
import Home from "./pages/Home";
import TopAdmin from "./pages/TopAdmin";
import Fuelcontrol from "./pages/Fuelcontrol";
import Fuelstations from "./pages/Fuelstations";
import Fuel from "./pages/Fuel";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/topadmin" element={<TopAdmin />}></Route>
        <Route path="/fuelcontrol/:id" element={<Fuelcontrol />}></Route>
        <Route path="/fuelstations" element={<Fuelstations />}></Route>
        <Route path="/fuelstation/:id" element={<Fuel />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
