import "./Modalconfirmation.css";
import Modal from "@mui/material/Modal";
import { CustomButton } from "../CustomComponents";
function ModalConfirmation({
    openConfirmation,
    setOpenConfirmation,
    handleClickDelete,
}) {
    const handleClose = () => {
        setOpenConfirmation(false);
    };
    return (
        <Modal open={openConfirmation} onClose={handleClose}>
            <div className="confirmation-container">
                <h2>Eliminar</h2>
                <p className="text-confirmation">
                    ¿Quieres eliminar esta transacción?
                </p>
                <div className="button-container">
                    <CustomButton
                        label="Mantener"
                        variant={"text"}
                        onClick={handleClose}
                    />
                    <CustomButton
                        label="Eliminar"
                        onClick={handleClickDelete}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default ModalConfirmation;
