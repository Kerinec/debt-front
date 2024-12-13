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
    const calculateDebtMonth = (monthTransactions) => {
        return monthTransactions.reduce((acc, amount) => {
            return acc + parseInt(amount.amount);
        },0);
    };

    return (
        <div className="transaction-list-container">
            {transactionData.map((data, index) => {
                return (
                    <>
                        <div className="header-transaction">
                            <div className="transaction-month">{data.date}</div>
                            <div className="transaction-expend">
                                <div className="total-expend">
                                    <span className="red-text">
                                        {calculateDebtMonth(data.transactions)} €
                                    </span>{" "}
                                    total gastado
                                </div>
                                <span>|</span>
                                <div className="total-transaction">
                                    <span className="red-text">{data.transactions.length}</span> gastos
                                </div>
                            </div>
                        </div>
                        <span className="border-bottom"></span>
                    {data.transactions.map((element)=>{
                       return <TransactionItem dataTransactions={element} key={element.id}/>
                    })}
                    </>
                );
            })}
        </div>
    );
};

export default Transaction;
