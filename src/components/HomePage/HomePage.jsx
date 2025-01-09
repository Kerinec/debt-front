import { useEffect, useState } from "react";
import { CustomButton, CustomInput } from "../CustomComponents";
import CustomTabs from "../CustomTabs/CustomTabs";
import "./HomePage.css";
import axios from "axios";
import Notification from "../Notification/Notification";
function HomePage() {
    const [changeTab, setChangeTab] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);
    const handleClick = (value) => {
        setChangeTab(value);
    };

    const Login = () => {
        return (
            <div className="login-register-container">
                <CustomInput label={"Nombre de usuario"} />
                <CustomInput label={"Contraseña"} type={"password"} />
                <CustomButton label={"Iniciar sesión"} />
                <div className="have-acount-container">
                    <span>No estás registrado?</span>
                    <span
                        onClick={() => handleClick(1)}
                        className="redirect-register"
                    >
                        Registrate
                    </span>
                </div>
            </div>
        );
    };
    const Register = () => {
        const [formData, setFormData] = useState({
            username: "",
            password: "",
            confirmPasword: "",
        });
        const [errors, setErrors] = useState({
            inputUsername: {
                error: false,
                text: "",
            },
            inputPassword: {
                error: false,
                text: "",
            },
        });
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
        const handleBlur = async (e) => {
            if (e.target.name === "username") {
                const response = await axios.get(
                    `http://localhost:3000/user/${formData.username}`
                );
                console.log(response.data);
                if (response.data.userExist) {
                    setErrors({
                        ...errors,
                        inputUsername: {
                            error: true,
                            text: "El usuario ya existe",
                        },
                    });
                } else {
                    setErrors({
                        ...errors,
                        inputUsername: {
                            error: false,
                            text: "",
                        },
                    });
                }
            } else if (e.target.name === "confirmPasword") {
                if (formData.password === formData.confirmPasword) {
                    setErrors({
                        ...errors,
                        inputPassword: {
                            error: false,
                            text: "",
                        },
                    });
                } else {
                    setErrors({
                        ...errors,
                        inputPassword: {
                            error: true,
                            text: "La contraseña no coincide",
                        },
                    });
                }
            }
        };
        const validateForm = () => {
            let deltaErrors = { ...errors };
            if (formData.password !== formData.confirmPasword) {
                deltaErrors.inputPassword = {
                    error: true,
                    text: "No coincide la contraseña",
                };
            }
            setErrors(deltaErrors);
        };
        const handleClickRegister = async () => {
            console.log("entramos en handleClick");
            validateForm();
            let formHasErrors = Object.keys(errors).every((element) => {
                return !errors[element].error;
            });
            console.log(formHasErrors, "prueba de error");
            if (formHasErrors) {
                try {
                    await postRegister();
                    setOpenAlert(true);
                    setChangeTab(0)
                } catch (error) {
                    if (error.status === 400) {
                        setErrors({
                            ...errors,
                            inputUsername: {
                                error: true,
                                text: error.response.data,
                            },
                        });
                    }
                }
            }
        };
        const postRegister = async () => {
            const payload = {
                username: formData.username,
                password: formData.password,
            };
            await axios.post("http://localhost:3000/register", payload);
        };
        return (
            <div className="login-register-container">
                <CustomInput
                    label={"Nombre de usuario"}
                    onChange={handleChange}
                    name={"username"}
                    errors={errors.inputUsername}
                    onBlur={handleBlur}
                />
                <CustomInput
                    label={"Contraseña"}
                    type={"password"}
                    onChange={handleChange}
                    name={"password"}
                />
                <CustomInput
                    label={"Confirma tu Contraseña"}
                    type={"password"}
                    onChange={handleChange}
                    name={"confirmPasword"}
                    errors={errors.inputPassword}
                    onBlur={handleBlur}
                />
                <CustomButton
                    label={"Registrarse"}
                    onMouseDown={handleClickRegister}
                />
                <div className="have-acount-container">
                    <span>Ya estás registrado?</span>
                    <span
                        onClick={() => handleClick(0)}
                        className="redirect-register"
                    >
                        Iniciar sesión
                    </span>
                </div>
            </div>
        );
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
    console.log(openAlert);
    return (
        <div className="home-container">
            <div className="background">
                <CustomTabs
                    data={dataTabs}
                    changeTab={changeTab}
                    setChangeTab={setChangeTab}
                />
            </div>
            <Notification open={openAlert} setOpen={setOpenAlert} />
        </div>
    );
}

export default HomePage;
