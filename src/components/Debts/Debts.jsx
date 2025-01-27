import { useContext } from "react";
import { transactionContext } from "../../context/transactionContext";

function Debts() {
    const { transactionData } = useContext(transactionContext);
    console.log(transactionData);
    return <></>;
}

export default Debts;
