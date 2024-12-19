import { transactionContext } from "./transactionContext";
import { useEffect, useState } from "react";
import axios from "axios";
const StateCompo = ({ children }) => {
    const [transactionData, setTransactionData] = useState([]);
    useEffect(() => {
        getTransactions();
    }, []);

    const getTransactions = async () => {
        let response = await axios.get(`http://localhost:3000/transactions`);
        setTransactionData(response.data);
    };
    return (
        <transactionContext.Provider
            value={{ transactionData, setTransactionData, getTransactions }}
        >
            {children}
        </transactionContext.Provider>
    );
};

export default StateCompo;
