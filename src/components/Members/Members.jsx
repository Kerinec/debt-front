import PropTypes, { element } from "prop-types";
import ModalMembers from "../Modal/ModalMembers";
import "./Members.css";
import MembersItem from "./MembersItem";
import { useContext } from "react";
import { transactionContext } from "../../context/transactionContext";
const Members = ({ data, getMembers }) => {
    const { transactionData } = useContext(transactionContext);

    const expendMembers = (idMember) => {
        const expend = transactionData.reduce((acc, trans) => {
            trans.transactions.forEach((element) => {
                if (element.id_origin === idMember) {
                    if (!acc.expend) {
                        acc.expend = parseInt(element.amount);
                    } else {
                        acc.expend += parseInt(element.amount);
                    }
                }
            });
            return acc;
        }, {});
        if (Object.keys(expend).length === 0) {
            expend.expend = 0;
        }
        return expend;
    };
    const debtMembers = (idMember) => {
        let calcule = 0
        const debt = transactionData.reduce((acc, trans) => {
            trans.transactions.forEach((element) => {
                if (element.id_destination.includes(idMember)) {
                    if(element.id_origin === idMember){
                      calcule = element.amount / element.id_destination.length
                        acc += calcule * element.id_destination.length -1
                    }
                    acc += (-(element.amount / element.id_destination.length))

                }
            });
            return acc;
        }, 0);
        return parseFloat(debt.toFixed(2));
    };
    return (
        <>
            <div className="members-list-container">
                <div className="header-member">Miembros</div>
                {data.map((dataMember) => {
                    return (
                        <MembersItem
                            dataMember={dataMember}
                            key={dataMember.id}
                            expends={expendMembers(dataMember.id)}
                            debts={debtMembers(dataMember.id)}
                        />
                    );
                })}
            </div>
            {/* <ModalMembers getMembers={getMembers}/> */}
        </>
    );
};
Members.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Members;
