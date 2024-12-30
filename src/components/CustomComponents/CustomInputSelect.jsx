import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ThemeProvider } from "@emotion/react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { createTheme } from "@mui/material";
import PropTypes, { element } from "prop-types";
import FormHelperText from "@mui/material/FormHelperText";
const CustomInputSelect = ({ data, handleChange, formData, errors }) => {
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
    const initialName = data.find((element) => element.id === formData.member)
        ?.name[0];
    return (
        <>
            {formData.member !== "" ? (
                <div className="logo-person">{initialName}</div>
            ) : null}
            <ThemeProvider theme={theme}>
                <FormControl error={errors.error}>
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
                                    value={member.id}
                                    key={member.name + "member"}
                                >
                                    {member.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    <FormHelperText>{errors.text}</FormHelperText>
                </FormControl>
            </ThemeProvider>
        </>
    );
};
CustomInputSelect.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default CustomInputSelect;
