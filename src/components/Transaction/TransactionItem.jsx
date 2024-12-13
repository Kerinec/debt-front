import Tooltip from "@mui/material/Tooltip";
const TransactionItem = ({ dataTransactions }) => {
    const completeDate = new Intl.DateTimeFormat("es-ES", {
        dateStyle: "full",
        timeStyle: "short",
    });
    return (
        <div className="transaction-item-container">
            <Tooltip title={dataTransactions.name_origin}>
                <div className="icon-origin">
                    {dataTransactions.name_origin[0]}
                </div>
            </Tooltip>
            <div className="info-transaction">
                <div className="info-subject">
                    {dataTransactions.description}
                </div>
                <div className="info-date">
                    {completeDate.format(new Date(dataTransactions.date))}
                </div>
                <div className="info-member-origin">
                    <span>{dataTransactions.name_origin}</span> pagó
                </div>
            </div>
            <div className="info-debt">
                <div className="red-text debt-transaction">
                    {dataTransactions.amount} €
                </div>
                <div className="icon-destination-container">
                    {dataTransactions.name_destination.map((name) => (
                        <Tooltip
                            title={name.name}
                            key={name.id + "destination"}
                        >
                            <span className="icon-destination">
                                {name.name[0]}
                            </span>
                        </Tooltip>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default TransactionItem;
