import React, { useContext } from "react";
import Home from "./Home";
import LoginPage from "./pages/Login";
import "./App.css";
import { AuthContext } from "./AuthContext";

function App() {
    const auth = useContext(AuthContext);
    return auth.token ? <Home /> : <LoginPage />;
}

export default App;
