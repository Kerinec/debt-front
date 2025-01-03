import { useEffect, useState } from "react";
import { CustomButton, CustomInput } from "../CustomComponents";
import CustomTabs from "../CustomTabs/CustomTabs";
import "./HomePage.css";
function HomePage() {

    const Login = () => {

        return (
            <div className="login-container">
                <CustomInput label={"Username"} />
                <CustomInput label={"Password"} />
                <CustomButton label={"Login"} />
                <div className="have-acount-container">
                    <span>No estás registrado?</span>
                    <span className="redirect-register">
                        Registrate
                    </span>
                </div>
            </div>
        );
    };
    const Register = () => {
        return <div>Hola Register</div>;
    };
    const dataTabs = [
        {
            label: "Login",
            content: <Login />,
        },
        {
            label: "Register",
            content: <Register />,
        },
    ];

    return (
        <div className="home-container">
            <div className="background">
                <CustomTabs data={dataTabs} />
            </div>
        </div>
    );
}

export default HomePage;
