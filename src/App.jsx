import { BrowserRouter, Routes, Route } from "react-router";
import StateCompo from "./context/StateCompo";
import HomePage from "./components/HomePage/HomePage";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedComponent from "./components/ProtectedComponent";

function App() {
    return (
        <StateCompo>
            <BrowserRouter>
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
            </BrowserRouter>
        </StateCompo>
    );
}

export default App;
