import "./App.css";

function App() {
    return (
        <>
            <header>
                <div className="logo">Pasta Gansa</div>
                <button className="transaction-button">
                    Añadir transacción
                </button>
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
                <div className="menu">
                    <button className="options">Transacciones</button>
                    <button className="options">Deudas</button>
                    <button className="options">Miembros</button>
                    <button className="options">Permisos</button>
                    <button className="options">Actividad reciente</button>
                </div>
                <div className="transactions">
                    <div className="transaction-month">Octubre 2024</div>
                    <div className="transaction-list">
                        <div className="transaction-container">
                            <div className="transaction-date">
                                29 de octubre de 2024 13:00
                            </div>
                            <div className="transaction-description">Juego</div>
                            <div className="transaction-user">
                                Sebastián pagó
                            </div>
                            <div className="transaction-amount">80 €</div>
                        </div>
                        <div className="transaction-container">
                            <div className="transaction-date">
                                28 de octubre de 2024 15:00
                            </div>
                            <div className="transaction-description">
                                Pastel
                            </div>
                            <div className="transaction-user">Carlos pagó</div>
                            <div className="transaction-amount">70 €</div>
                        </div>
                        <div className="transaction-container">
                            <div className="transaction-date">
                                27 de octubre de 2024 19:00
                            </div>
                            <div className="transaction-description">Silla</div>
                            <div className="transaction-user">
                                Sebastián pagó
                            </div>
                            <div className="transaction-amount">40 €</div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
