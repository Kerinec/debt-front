import "./Dashboard.css";
import CustomTabs from "../CustomTabs/CustomTabs";
import Transaction from "../Transaction/Transaction";
import ModalTransaction from "../Modal/ModalTransaction";
import Members from "../Members/Members";
import axios from "axios";
import { useEffect, useState } from "react";
import { CustomButton } from "../CustomComponents";
function Dashboard() {
    const [dataMembers, setDataMembers] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        getMembers();
    }, []);
    const handleOpen = () => setOpen(true);

    const getMembers = async () => {
        let response = await axios.get(`http://localhost:3000/members`);
        setDataMembers(response.data);
    };
    const dataTabs = [
        {
            label: "Transaccion",
            content: <Transaction />,
        },
        {
            label: "Deudas",
            content: "Informacion de las Deudas",
        },
        {
            label: "Miembros",
            content: <Members data={dataMembers} getMembers={getMembers} />,
        },
        {
            label: "Permisos",
            content: "Informacion de las Permisos",
        },
        {
            label: "Actividad Reciente",
            content: "Informacion de las Actividad Reciente",
        },
    ];

    return (
        <>
            <header>
                <a href="http://localhost:5173/">
                    <div className="logo">Pasta Gansa</div>
                </a>
                <CustomButton
                    onClick={handleOpen}
                    label={"Añadir Transacción"}
                />
                <ModalTransaction
                    dataMembers={dataMembers}
                    open={open}
                    setOpen={setOpen}
                />
                <div className="user-info">
                    <div className="user-name">Carlos Kerinec</div>
                    <div className="user-email">carloskerinec@gmail.com</div>
                </div>
            </header>
            <main>
                <div className="balance-container">
                    <div className="balance-section">
                        <div className="balance-circle">
                            <div className="balance-amount">
                                <div className="balance-user">Carlos</div>
                                <div className="balance-money">-20€</div>
                            </div>
                        </div>
                        <div className="balance-info">
                            <div className="balance-info-user">Carlos</div>
                            <div className="balance-info-transaction">
                                Transacciones:3
                            </div>
                            <div className="blance-info-total">
                                Monto total gastado 100€
                            </div>
                            <div className="action">Carlos debe pagar</div>
                            <button className="graphic">Mostrar gráfica</button>
                        </div>
                    </div>
                </div>
                <CustomTabs data={dataTabs} />
            </main>
        </>
    );
}

export default Dashboard;
