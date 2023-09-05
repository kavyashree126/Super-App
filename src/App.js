import Select_Music from "./Pages/Select_Music";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import Home_Page from "./Pages/Home_Page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="categories" element={<Select_Music />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Home" element={<Home_Page />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
