import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/register/Register";
import { StateProvider } from "./context/StateContext";
import { initialState } from "./context/StateReducers";
import reducer from "./context/StateReducers";

function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;
