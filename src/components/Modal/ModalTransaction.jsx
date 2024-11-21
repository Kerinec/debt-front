import { useState } from "react";
import "./ModalTransaction.css";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {
    CustomInput,
    CustomInputSelect,
    CustomButton,
    CustomDate,
} from "../CustomComponents";
const ModalTransaction = ({ dataMembers }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(dataMembers, "member,modal");
    return (
        <div>
            <CustomButton onClick={handleOpen} label={"Añadir Transacción"} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="debt-form-container">
                    <div className="debt-header-container">
                        <h2 className="title-new-expense">Nuevo gasto</h2>
                        <IconButton>
                            <CancelIcon className="icon" />
                        </IconButton>
                    </div>
                    <div className="debt-person-container">
                        <CustomInputSelect data={dataMembers} />
                    </div>
                    <CustomInput label={"Cantidad"} textAlign={"right"} />
                    <div className="debt-split-persons-title">Para quién</div>
                    <div className="split-debt-container">
                        {dataMembers.map((member) => {
                            return (
                                <div
                                    className="split-debt"
                                    key={member.name + "split-debt"}
                                >
                                    <div className="logo-person">
                                        {member.name[0]}
                                    </div>
                                    <div className="split-info-amount">
                                        <div className="person">
                                            {member.name}
                                        </div>
                                        <div className="amount">0€</div>
                                    </div>
                                    <Checkbox />
                                </div>
                            );
                        })}
                    </div>
                    <CustomInput label={"Asunto"} />
                    <CustomDate />
                </div>
            </Modal>
        </div>
    );
};

export default ModalTransaction;
