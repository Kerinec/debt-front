import axios from "axios";
import { useEffect, useState } from "react";
import "./Transaction.css";
import TransactionItem from "./TransactionItem";

const Transaction = () => {
    const [transactionData, setTransactionData] = useState([]);
    useEffect(() => {
        getTransactions();
    }, []);

    const getTransactions = async () => {
        let response = await axios.get(`http://localhost:3000/transactions`);
        setTransactionData(response.data);
    };
    return (
        <div className="transaction-list-container">
            <div className="header-transaction">
                <div className="transaction-month">October 2024</div>
                <div className="transaction-expend">
                    <div className="total-expend">
                        {" "}
                        <span className="red-text">135 €</span> total gastado
                    </div>
                    <span>|</span>
                    <div className="total-transaction">
                        <span className="red-text">3</span> gastos
                    </div>
                </div>
            </div>
            <span className="border-bottom"></span>
            <TransactionItem />
            <TransactionItem />
        </div>
    );
};

export default Transaction;
