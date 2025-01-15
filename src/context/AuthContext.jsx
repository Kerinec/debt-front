import { useEffect, useState } from "react";
import { authCreateContext } from "./authCreateContext";
import { useNavigate } from "react-router";
import axios from "axios";
const AuthContext = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    let navigate = useNavigate();
    useEffect(() => {
        const tokenStorage = localStorage.getItem("token");
        if (tokenStorage) {
            setToken(tokenStorage);
            setIsLogged(true);
            navigate("/dashboard");
        }
    }, []);
    useEffect(() => {
        if (isLogged) {
            getUser();
        }
    }, [isLogged]);
    const getUser = async () => {
        const response = await axios.get("http://localhost:3000/user", {
            headers: {
                token: token,
            },
        });
        setUser(response.data.username);
    };
    const login = async (payload) => {
        const response = await axios.post(
            "http://localhost:3000/login",
            payload
        );
        localStorage.setItem("token", response.data);
        setToken(response.data);
        setIsLogged(true);
        navigate("/dashboard");
    };
    const logout = () => {
        localStorage.removeItem("token");
        setIsLogged(false);
        navigate("/");
    };
    return (
        <authCreateContext.Provider value={{ login, isLogged, logout, user }}>
            {children}
        </authCreateContext.Provider>
    );
};
export default AuthContext;
