const TransactionItem = () => {
    return (
        <div className="transaction-item-container">
            <div className="icon-origin">S</div>
            <div className="info-transaction">
                <div className="info-subject">Gasto</div>
                <div className="info-date">8 de octubre de 2024 19:03</div>
                <div className="info-member-origin">
                    <span>Sebastian</span> pagó
                </div>
            </div>
            <div className="info-debt">
                <div className="red-text debt-transaction">70 €</div>
                <div className="icon-destination-container">
                    <span className="icon-destination">C</span>
                    <span className="icon-destination">D</span>
                </div>
            </div>
        </div>
    );
};
export default TransactionItem;
