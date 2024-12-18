const MembersItem = ({ dataMember, expends, debts }) => {
    return (
        <div className="members-item-container">
            <div className="icon-origin">{dataMember.name[0]}</div>
            <div className="info-member">
                <div className="member-name">{dataMember.name}</div>
                <div className="member-expend">Gastado: {expends.expend} €</div>
            </div>

            <div
                className={
                    debts > 0
                        ? "member-debt green-text"
                        : debts === 0
                        ? "member-debt gray-text"
                        : "member-debt red-text-debt"
                }
            >
                {debts} €
            </div>
        </div>
    );
};

export default MembersItem;
