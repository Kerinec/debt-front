import axios from "axios";
import { elements } from "chart.js";
import { useEffect, useState } from "react";

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
        <div className="transactions">
            {transactionData.map((month, index) => {
                return (
                    <div className="month-container" key={"month" + index}>
                        <div className="transaction-month">{month.date}</div>
                        <div className="transaction-list">
                            {month.transactions.map((element, i) => (
                                <div
                                    className="transaction-container"
                                    key={element.id + "container" + i}
                                >
                                    <div className="transaction-date">
                                        {new Date(
                                            element.date
                                        ).toLocaleString()}
                                    </div>
                                    <div className="transaction-description">
                                        {element.description}
                                    </div>
                                    <div className="transaction-user">
                                        {`${element.nombre_origen} pagó a ${element.nombre_destino}`}
                                    </div>
                                    <div className="transaction-amount">
                                        {`${element.amount} €`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Transaction;
