import { useEffect } from "react";
import { useNavigate } from "react-router";
import { authCreateContext } from "../context/authCreateContext";
import { useContext } from "react";
const ProtectedComponent = ({ children }) => {
    const { isLogged } = useContext(authCreateContext);
    let navigate = useNavigate();
    console.log(isLogged);
    useEffect(() => {
        if (!isLogged) {
            navigate("/");
        }
    }, []);
    return isLogged && children;
};

export default ProtectedComponent;
