import { useContext, useEffect, useState } from "react";
import "./ModalTransaction.css";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton, patch } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {
    CustomInput,
    CustomInputSelect,
    CustomButton,
    CustomDate,
} from "../CustomComponents";
import dayjs from "dayjs";
import axios from "axios";
import { transactionContext } from "../../context/transactionContext";

const ModalTransaction = ({
    open,
    setOpen,
    isEdit = false,
    selectedTransaction,
}) => {
    const [formData, setFormData] = useState({
        member: "",
        amount: 0,
        data: [],
        subject: "",
        date: dayjs().format(),
    });
    const [errors, setErrors] = useState({
        select: {
            error: false,
            text: "",
        },
        inputAmount: {
            error: false,
            text: "",
        },
        check: {
            error: false,
            text: "",
        },
        inputSubject: {
            error: false,
            text: "",
        },
        inputDate: {
            error: false,
            text: "",
        },
    });
    const { getTransactions, dataMembers } = useContext(transactionContext);

    useEffect(() => {
        if (!isEdit) {
            setFormData({ ...formData, data: generateMemberData() });
        } else {
            console.log(selectedTransaction);
            setFormData({
                member: selectedTransaction.id_origin,
                amount: selectedTransaction.amount,
                data: dataMembers.reduce((acc, element) => {
                    let isDestination =
                        selectedTransaction.id_destination.includes(element.id);
                    acc.push({
                        id: element.id,
                        name: element.name,
                        amountMember: isDestination
                            ? debtCalculation(
                                  selectedTransaction,
                                  selectedTransaction.id_destination.length
                              )
                            : 0,
                        checked: isDestination,
                    });
                    return acc;
                }, []),
                subject: selectedTransaction.description,
                date: selectedTransaction.date,
            });
        }
    }, [dataMembers, selectedTransaction]);

    const handleClose = () => {
        setFormData({
            member: "",
            amount: 0,
            data: generateMemberData(),
            subject: "",
            date: dayjs().format(),
        });
        setErrors({
            select: {
                error: false,
                text: "",
            },
            inputAmount: {
                error: false,
                text: "",
            },
            check: {
                error: false,
                text: "",
            },
            inputSubject: {
                error: false,
                text: "",
            },
            inputDate: {
                error: false,
                text: "",
            },
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
                ? debtCalculation(formData, filteredCheck.length)
                : 0,
        }));
        setFormData({ ...formData, data: updateData });
    };
    const resetError = (obj, property) => {
        return (obj[property] = {
            error: false,
            text: "",
        });
    };
    const validateForm = () => {
        const filteredCheck = formData.data.filter(
            (element) => element.checked
        );
        let deltaErrors = { ...errors };

        // Select validation
        if (formData.member === "") {
            deltaErrors.select = {
                error: true,
                text: "* Este campo no puede estar vacío",
            };
        } else {
            resetError(deltaErrors, "select");
        }

        // Input Amount validation
        if (formData.amount === 0) {
            deltaErrors.inputAmount = {
                error: true,
                text: "* Este campo no puede estar vacío",
            };
        } else if (isNaN(parseFloat(formData.amount))) {
            deltaErrors.inputAmount = {
                error: true,
                text: "* Este campo solo permite números",
            };
        } else {
            resetError(deltaErrors, "inputAmount");
        }

        // checkBoxes validation
        if (formData.data.every((check) => !check.checked)) {
            deltaErrors.check = {
                error: true,
                text: "* Selecciona mínimo a un miembro",
            };
        } else if (filteredCheck.length === 1) {
            if (filteredCheck[0].id === formData.member) {
                deltaErrors.check = {
                    error: true,
                    text: "* El pagador no puede ser el único deudor",
                };
            }
        } else {
            resetError(deltaErrors, "check");
        }

        //Subject validation
        if (formData.subject === "") {
            deltaErrors.inputSubject = {
                error: true,
                text: "* Este campo no puede estar vacío",
            };
        } else if (formData.subject.length < 3) {
            deltaErrors.inputSubject = {
                error: true,
                text: "* Tiene que contener más de 3 caracteres",
            };
        } else {
            resetError(deltaErrors, "inputSubject");
        }
        setErrors(deltaErrors);
    };
    const handleClick = async () => {
        validateForm();
        let formHasErrors = Object.keys(errors).every((element) => {
            return !errors[element].error;
        });
        if (formHasErrors) {
            if (isEdit) {
                await patchTransaction();
            } else {
                await postTransaction();
            }
            await getTransactions();
            handleClose();
        }
    };
    const handleClickDelete = async () => {
        await axios.delete(
            `http://localhost:3000/transaction/${selectedTransaction.id}`
        );
        await getTransactions();
        handleClose();
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
        await axios.post("http://localhost:3000/transaction", payLoad);
    };
    const patchTransaction = async () => {
        const payLoad = {
            id: selectedTransaction.id,
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
        await axios.patch("http://localhost:3000/transaction", payLoad);
    };
    const debtCalculation = (dataForm, members) => {
        if (members === 0) return 0;
        let result = dataForm.amount / members;
        return parseFloat(result.toFixed(2));
    };
    return (
        <div>
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
                            errors={errors.select}
                        />
                    </div>
                    <CustomInput
                        label={"Cantidad"}
                        textAlign={"right"}
                        onChange={handleChange}
                        name={"amount"}
                        errors={errors.inputAmount}
                        value={formData.amount}
                    />
                    <div
                        className={
                            errors.check.error
                                ? "debt-split-container border-error"
                                : "debt-split-container"
                        }
                    >
                        <div className="debt-split-persons-container">
                            <div
                                className={
                                    errors.check.error
                                        ? "debt-split-persons-title color-error"
                                        : "debt-split-persons-title"
                                }
                            >
                                Para quién
                            </div>
                            {errors.check.error ? (
                                <div className="check-error color-error">
                                    {errors.check.text}
                                </div>
                            ) : null}
                        </div>
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
                                            checked={member.checked}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <CustomInput
                        label={"Asunto"}
                        name={"subject"}
                        onChange={handleChange}
                        errors={errors.inputSubject}
                        value={formData.subject}
                    />
                    <CustomDate
                        handleChangeDay={handleChangeDay}
                        data={formData}
                    />
                    {isEdit ? (
                        <>
                            <CustomButton
                                label={"Eliminar"}
                                variant={"text"}
                                onClick={handleClickDelete}
                            />{" "}
                            <CustomButton
                                label={"Guardar"}
                                variant={"contained"}
                                onClick={handleClick}
                            />
                        </>
                    ) : (
                        <CustomButton
                            label={"Añadir Gasto"}
                            variant={"contained"}
                            onClick={handleClick}
                        />
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default ModalTransaction;
