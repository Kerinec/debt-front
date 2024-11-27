import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ThemeProvider } from "@emotion/react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { createTheme } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
const CustomInputSelect = ({ data, handleChange, formData }) => {

    const theme = createTheme({
        components: {
            MuiSelect: {
                styleOverrides: {
                    root: {
                        color: "#fff",
                    },
                    icon: {
                        color: "#fff",
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: "#fff", // Color del borde del Select
                    },
                    root: {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ff5", // Color del borde al pasar el cursor (hover)
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#fff", // Color del borde cuando está enfocado
                        },
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: "#fff",
                        "&.Mui-focused": {
                            color: "#fd5858",
                        },
                    },
                },
            },
        },
    });
    return (
        <>
            {formData.member !== "" ? (
                <div className="logo-person">{formData.member[0]}</div>
            ) : null}
            <ThemeProvider theme={theme}>
                <FormControl>
                    <InputLabel id="select-label">Pagó</InputLabel>
                    <Select
                        value={formData.member}
                        label={"pagó"}
                        labelId="select-label"
                        onChange={handleChange}
                        sx={{ minWidth: 120 }}
                        name={"member"}
                    >
                        {data.map((member) => {
                            return (
                                <MenuItem
                                    value={member.name}
                                    key={member.name + "member"}
                                >
                                    {member.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </ThemeProvider>
        </>
    );
};
CustomInputSelect.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default CustomInputSelect;
