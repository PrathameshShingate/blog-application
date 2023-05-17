import { useContext } from "react";
import Posts from "./components/posts/Posts";
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/home/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts" element={<Posts />} />
        <Route
          path="/register"
          element={user ? <Homepage /> : <Register />}
        />
        <Route path="/login" element={user ? <Homepage /> : <Login />} />
        <Route path="/posts/:id" element={<Single />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route
          path="/settings"
          element={user ? <Settings /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
