import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const CustomTabPanel = ({ children, value, index }) => {
    return (
        <div hidden={value !== index}>
            {value === index && (
                <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
                    {children}
                </Box>
            )}
        </div>
    );
};
const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(16),
    padding: "10px 15px",
    color: "#fff",
    "@media (max-width:720px)": {
        display: "flex",
        flexWrap: "wrap",
        fontSize: "10px",
        width: "90px",
    },
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
        scrollButtons="auto"
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

function CustomTabs({ data, changeTab = 0, setChangeTab }) {
    const [tabValue, setTabValue] = useState(0);
    useEffect(() => {
        setTabValue(changeTab);
    }, [changeTab]);
    const handleChange = (event, newTabValue) => {
        setTabValue(newTabValue);
        setChangeTab(newTabValue);
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
