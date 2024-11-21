import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
const CustomButton = (props) =>{
    const ColorButton = styled(Button)(({ theme }) => ({
        backgroundColor: "#fd5858",
        "&:hover": {
            backgroundColor: "#FFAB91",
        },
    }));
    return (<ColorButton variant="contained" {...props}>
        {props.label}
    </ColorButton>)
}
export default CustomButton