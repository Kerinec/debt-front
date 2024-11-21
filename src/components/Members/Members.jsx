import PropTypes from "prop-types";
import ModalMembers from "../Modal/ModalMembers";
const Members = ({ data, getMembers }) => {
    return (
        <>
            <div className="members-container">
                {data.map((member) => {
                    return (
                        <div className="member" key={member.id + member.name}>
                            {member.name}
                        </div>
                    );
                })}
            </div>
            <ModalMembers getMembers={getMembers}/>
        </>
    );
};
Members.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Members;
