import { useContext } from "react";
import "./Transaction.css";
import TransactionItem from "./TransactionItem";
import { transactionContext } from "../../context/transactionContext";

const Transaction = () => {
    const { transactionData } = useContext(transactionContext);
    const calculateDebtMonth = (monthTransactions) => {
        return monthTransactions.reduce((acc, amount) => {
            return acc + parseInt(amount.amount);
        }, 0);
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
                                        {calculateDebtMonth(data.transactions)}{" "}
                                        €
                                    </span>{" "}
                                    total gastado
                                </div>
                                <span>|</span>
                                <div className="total-transaction">
                                    <span className="red-text">
                                        {data.transactions.length}
                                    </span>{" "}
                                    gastos
                                </div>
                            </div>
                        </div>
                        <span className="border-bottom"></span>
                        {data.transactions.map((element) => {
                            return (
                                <TransactionItem
                                    dataTransactions={element}
                                    key={element.id}
                                />
                            );
                        })}
                    </>
                );
            })}
        </div>
    );
};

export default Transaction;
