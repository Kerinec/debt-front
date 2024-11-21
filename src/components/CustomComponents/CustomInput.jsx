import { createTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@emotion/react";

const CustomInput = (props) => {
    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "--bgColor": "#333",
                        "--color": "#fff",
                        backgroundColor: "var(--bgColor)",
                        "& label": {
                            color: "var(--color)",
                        },
                        "& .MuiInputBase-input": {
                            color: "#fff",
                            textAlign:
                                props.textAlign === "right"
                                    ? props.textAlign
                                    : "left",
                        },
                        "& label.Mui-focused": {
                            color: "var(--color)",
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--color)",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--color)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ff5",
                        },
                    },
                },
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <TextField {...props} />
        </ThemeProvider>
    );
};
export default CustomInput;