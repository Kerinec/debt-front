import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { color } from "chart.js/helpers";
const CustomButton = (props) => {
    const isText = props.variant === "text";
    const ColorButton = styled(Button)(({ theme }) => ({
        backgroundColor: isText ? "none" : "#fd5858",
        color: isText ? "#fd5858": "#fff",
        "&:hover": {
            backgroundColor: isText ? "#FFAB9130": "#FFAB91",
            color: "#fff" 
        },
    }));
    return <ColorButton {...props}>{props.label}</ColorButton>;
};
export default CustomButton;
