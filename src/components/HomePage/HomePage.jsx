import { useContext, useEffect, useState } from "react";
import { CustomButton, CustomInput } from "../CustomComponents";
import CustomTabs from "../CustomTabs/CustomTabs";
import "./HomePage.css";
import axios from "axios";
import Notification from "../Notification/Notification";
import { authCreateContext } from "../../context/authCreateContext";
function HomePage() {
    const [changeTab, setChangeTab] = useState(0);
    const [openAlert, setOpenAlert] = useState({
        success: false,
        error: false,
    });
    const { login } = useContext(authCreateContext);
    const handleClick = (value) => {
        setChangeTab(value);
    };

    const Login = () => {
        const [formData, setFormData] = useState({
            username: "",
            password: "",
        });
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const handleClickLogin = async () => {
            const payload = {
                username: formData.username,
                password: formData.password,
            };
            try {
                await login(payload);
            } catch (error) {
                alert(error.toString())
                if (error.status === 400) {
                    setOpenAlert({ ...openAlert, error: true });
                }
            }
        };
        return (
            <div className="login-register-container">
                <CustomInput
                    label={"Nombre de usuario"}
                    onChange={handleChange}
                    name={"username"}
                    value={formData.username}
                />
                <CustomInput
                    label={"Contraseña"}
                    type={"password"}
                    onChange={handleChange}
                    name={"password"}
                />
                <CustomButton
                    label={"Iniciar sesión"}
                    onClick={handleClickLogin}
                />
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
            validateForm();
            let formHasErrors = Object.keys(errors).every((element) => {
                return !errors[element].error;
            });
            if (formHasErrors) {
                try {
                    await postRegister();
                    setOpenAlert({ ...openAlert, success: true });
                    setChangeTab(0);
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
    return (
        <div className="home-container">
            <div className="background">
                <CustomTabs
                    data={dataTabs}
                    changeTab={changeTab}
                    setChangeTab={setChangeTab}
                />
            </div>
            <Notification
                open={openAlert.success}
                setOpen={(isOpen) =>
                    setOpenAlert({ ...openAlert, success: isOpen })
                }
                severity="success"
                message="Se ha registrado correctamente"
            />
            <Notification
                open={openAlert.error}
                setOpen={(isOpen) =>
                    setOpenAlert({ ...openAlert, error: isOpen })
                }
                severity="error"
                message="Usuario o contraseña incorrecta"
            />
        </div>
    );
}

export default HomePage;
