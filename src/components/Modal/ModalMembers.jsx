import { useContext, useState } from "react";
import "./ModalMembers.css";
import Modal from "@mui/material/Modal";
import { CustomInput, CustomButton } from "../CustomComponents";
import axios from "axios";
import { transactionContext } from "../../context/transactionContext";

const ModalMembers = () => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [errorExist, setErrorExist] = useState({
        error: false,
        helperText: "",
    });
    const { getMembers } = useContext(transactionContext);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setErrorExist({
            error: false,
            helperText: "",
        });
        setOpen(false);
    };
    const postMember = async (member) => {
        try {
            await axios.post(`http://localhost:3000/member`, {
                member: member,
            });
            getMembers();
            handleClose();
        } catch (error) {
            if (error.response.data.error === "UserAlreadyExists") {
                setErrorExist({
                    error: true,
                    helperText: error.response.data.message,
                });
            }
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleClick = () => {
        postMember(inputValue);
    };
    return (
        <div>
            <CustomButton onClick={handleOpen} label={"Añadir Miembro"} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="member-form-container">
                    <div className="member-form">
                        <CustomInput
                            label={"Nuevo Miembro"}
                            onChange={handleChange}
                            error={errorExist.error}
                            helperText={errorExist.helperText}
                        />
                        <CustomButton label={"Añadir"} onClick={handleClick} />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ModalMembers;
