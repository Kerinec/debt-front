import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
function Notification({ open, setOpen }) {
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    Se ha registrado correctamente
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Notification;
