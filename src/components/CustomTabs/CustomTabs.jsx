import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const CustomTabPanel = ({ children, value, index }) => {
    return (
        <div hidden={value !== index}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};
const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(16),
    padding: "10px 15px",
    color: "#fff",
    "&.Mui-selected": {
        color: "#fd5858",
        borderColor: "#fd5858",
    },
    "&.Mui-focusVisible": {
        backgroundColor: "#fd5858",
    },
    "& .MuiTabs-indicatorSpan": {
        backgroundColor: "#fd5858",
    },
}));
const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{
            children: <span className="MuiTabs-indicatorSpan" />,
        }}
    />
))({
    "& .MuiTabs-indicator": {
        display: "flex",
        backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
        width: "100%",
        backgroundColor: "#fd5858",
    },
});

function CustomTabs({ data }) {
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

    return (
        <>
            <StyledTabs value={tabValue} onChange={handleChange} centered>
                {data.map((element) => (
                    <StyledTab label={element.label} key={element.label} />
                ))}
            </StyledTabs>
            {data.map((element, index) => (
                <CustomTabPanel
                    value={tabValue}
                    index={index}
                    key={element.label + "panel"}
                >
                    {element.content}
                </CustomTabPanel>
            ))}
        </>
    );
}

export default CustomTabs;
