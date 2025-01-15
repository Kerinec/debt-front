import { createTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@emotion/react";

const CustomInput = (props) => {
    const { textAlign, errors = {}, ...rest } = props;
    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "--bgColor": "#333",
                        "--color": "#fff",
                        backgroundColor: "var(--bgColor) !important",
                        "& label": {
                            color: "var(--color)",
                        },
                        "& .MuiInputBase-input": {
                            color: "#fff",
                            textAlign:
                                textAlign === "right" ? textAlign : "left",
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
                        "&:-webkit-autofill": {
                            WebkitBoxShadow:
                                "0 0 0 1000px #333 inset !important",
                            WebkitTextFillColor: "#000 !important",
                        },
                    },
                },
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <TextField
                {...rest}
                error={errors?.error}
                helperText={errors?.text}
            />
        </ThemeProvider>
    );
};
export default CustomInput;
