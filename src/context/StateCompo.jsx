import { transactionContext } from "./transactionContext";
import { useEffect, useState } from "react";
import axios from "axios";
const StateCompo = ({ children }) => {
    const [transactionData, setTransactionData] = useState([]);
    const [dataMembers, setDataMembers] = useState([]);
    useEffect(() => {
        getTransactions();
        getMembers();
    }, []);
    const getTransactions = async () => {
        let response = await axios.get(`http://localhost:3000/transactions`);
        setTransactionData(response.data);
    };
    const getMembers = async () => {
        let response = await axios.get(`http://localhost:3000/members`);
        setDataMembers(response.data);
    };
    return (
        <transactionContext.Provider
            value={{ transactionData, setTransactionData, getTransactions, getMembers,dataMembers }}
        >
            {children}
        </transactionContext.Provider>
    );
};

export default StateCompo;
