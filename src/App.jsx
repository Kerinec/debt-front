import { BrowserRouter, Routes, Route } from "react-router";
import StateCompo from "./context/StateCompo";
import HomePage from "./components/HomePage/HomePage";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedComponent from "./components/ProtectedComponent";
import AuthContext from "./context/AuthContext";
import "./App.css";

function App() {
    return (
        <StateCompo>
            <BrowserRouter>
                <AuthContext>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedComponent>
                                    <Dashboard />
                                </ProtectedComponent>
                            }
                        />
                    </Routes>
                </AuthContext>
            </BrowserRouter>
        </StateCompo>
    );
}

export default App;
