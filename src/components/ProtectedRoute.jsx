import { useEffect } from "react";
import { useNavigate } from "react-router";

const ProtectedComponent = ({ children }) => {
    let navigate = useNavigate();
    let isAuth = false;
    useEffect(() => {
        if (!isAuth) {
            navigate("/");
        }
    }, []);
    return isAuth && children;
};

export default ProtectedComponent;
