import { BrowserRouter, Routes, Route } from "react-router";
import StateCompo from "./context/StateCompo";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedComponent from "./components/ProtectedRoute";

function App() {
    
    return (
        <StateCompo>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedComponent>
                                <Dashboard />
                            </ProtectedComponent>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </StateCompo>
    );
}

export default App;
