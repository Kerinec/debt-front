import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import dayjs from "dayjs";
import { color } from "chart.js/helpers";

const CustomDate = ({ handleChangeDay, data }) => {
    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        width: "100%",
                        "--bgColor": "#333",
                        "--color": "#fff",
                        backgroundColor: "var(--bgColor)",
                        "& label": {
                            color: "var(--color)",
                        },
                        "& .MuiInputBase-input": {
                            color: "#fff",
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
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        color: "#fff",
                        "&.MuiPickersArrowSwitcher-rightArrowIcon": {
                            color: "black",
                        },
                        "&.MuiPickersArrowSwitcher-leftArrowIcon": {
                            color: "black",
                        },
                        "&.MuiPickersCalendarHeader-switchViewIcon": {
                            color: "black",
                        },
                    },
                },
            },
        },
    });
    return (
        <>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                            label="Fecha"
                            value={dayjs(data.date)}
                            onChange={handleChangeDay}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </ThemeProvider>
        </>
    );
};

export default CustomDate;
