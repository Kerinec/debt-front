import { useEffect, useState } from "react";
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
    const [formData, setFormData] = useState({
        amount: 0,
        data: [],
    });
    useEffect(() => {
        let dataTransMemb = dataMembers.reduce((acumulador, element) => {
            acumulador.push({
                id: element.id,
                name: element.name,
                amountMember: 0,
                checked: false,
            });

            return acumulador;
        }, []);
        setFormData({ ...formData, data: dataTransMemb });
    }, [dataMembers]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setFormData({
            amount: 0,
        });
        setOpen(false);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, amount: e.target.value });
    };
    const handleChangeCheck = (e) => {
        let newArrayData = formData.data.reduce(
            (acumulador, element, index) => {
                if (index === parseInt(e.target.name)) {
                    acumulador.push({
                        ...element,
                        checked: e.target.checked,
                    });
                    return acumulador;
                } else {
                    acumulador.push(element);
                    return acumulador;
                }
            },
            []
        );
        setFormData({ ...formData, data: newArrayData });
    };
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
                    <CustomInput
                        label={"Cantidad"}
                        textAlign={"right"}
                        onChange={handleChange}
                    />
                    <div className="debt-split-persons-title">Para quién</div>
                    <div className="split-debt-container">
                        {formData.data.map((member, index) => {
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
                                        <div className="amount">
                                            {member.amountMember}€
                                        </div>
                                    </div>
                                    <Checkbox
                                        onChange={handleChangeCheck}
                                        name={`${index}`}
                                    />
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
