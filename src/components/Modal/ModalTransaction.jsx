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
import dayjs from "dayjs";
import axios from "axios";
const ModalTransaction = ({ dataMembers }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        member: "",
        amount: 0,
        data: [],
        subject: "",
        date: dayjs().format(),
    });
    useEffect(() => {
        setFormData({ ...formData, data: generateMemberData() });
    }, [dataMembers]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setFormData({
            amount: 0,
            data: generateMemberData(),
        });
        setOpen(false);
    };
    const generateMemberData = () => {
        return dataMembers.reduce((acumulador, element) => {
            acumulador.push({
                id: element.id,
                name: element.name,
                amountMember: 0,
                checked: false,
            });

            return acumulador;
        }, []);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleChangeDay = (e) => {
        let day = dayjs(e);
        setFormData({ ...formData, date: day.format() });
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
        const filteredCheck = newArrayData.filter((element) => element.checked);
        const updateData = newArrayData.map((element) => ({
            ...element,
            amountMember: element.checked
                ? debtCalculation(filteredCheck.length)
                : 0,
        }));
        setFormData({ ...formData, data: updateData });
    };
    const handleClick = () => {
        postTransaction();
    };
    const postTransaction = async () => {
        const payLoad = {
            amount: formData.amount,
            description: formData.subject,
            date: formData.date,
            id_origin: formData.member,
            id_destination: formData.data.reduce((acc, element) => {
                if (element.checked) {
                    acc.push(element.id);
                }
                return acc;
            }, []),
        };
        await axios.post(`http://localhost:3000/addTransaction`, payLoad);
    };
    const debtCalculation = (members) => {
        if (members === 0) return 0;
        let result = formData.amount / members;
        return parseFloat(result.toFixed(2));
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
                        <CustomInputSelect
                            data={dataMembers}
                            handleChange={handleChange}
                            formData={formData}
                        />
                    </div>
                    <CustomInput
                        label={"Cantidad"}
                        textAlign={"right"}
                        onChange={handleChange}
                        name={"amount"}
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
                    <CustomInput
                        label={"Asunto"}
                        name={"subject"}
                        onChange={handleChange}
                    />
                    <CustomDate
                        handleChangeDay={handleChangeDay}
                        data={formData}
                    />
                    <CustomButton
                        label={"Añadir Gasto"}
                        onClick={handleClick}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default ModalTransaction;
