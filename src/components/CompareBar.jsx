//importo il contesto per CompareContest
import { useCompare } from "../context/CompareContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//impoerto modale
import CompareModal from "./CompareModal";

export default function CompareBar() {
    //estraggo le funzioni dai contesti
    const { removeToCompare, clearCompare, itemsToCompare } = useCompare()
    //stato per aprire/chiudere modale
    const [isModalOpen, setIsModalOpen] = useState(false)
    //array di ids da passare alla modale
    const itemIds = itemsToCompare.map(item => item.id);
    //gestione vhiusura modale
    const handleModalClosure = () => {
        setIsModalOpen(false)
    }

    const hasItems = itemsToCompare.length !== 0
    //primo e secondo elemeto da comparare
    const firstItem = itemsToCompare[0]
    const secondItem = itemsToCompare[1]


    return (<>
        {/* La barra viene renderizzata solo se ci sono elementi in lista */}
        {hasItems && (
            <div className="compare-bar-container">
                <div className="compare-bar-header">
                    <h3>Esperienze selezionate {itemsToCompare.length}/2</h3>
                    <button
                        className="btn-trigger-compare"
                        disabled={itemsToCompare.length < 2}
                        onClick={() => setIsModalOpen(true)}
                    >
                        ⚖️ Confronta
                    </button>
                    <button
                        className="btn-reset"
                        onClick={() => {
                            clearCompare();
                            setIsModalOpen(false); // Chiude la modale se svuoti tutto
                        }}
                    >
                        Rimuovi tutte le esperienze
                    </button>
                </div>
                <div className="compare-slots-container">

                    {/* SLOT 1 */}
                    {firstItem && (
                        <div className="compare-slot filled">
                            <div className="slot-info">
                                <h4>{firstItem.title}</h4>
                                <span className="slot-badge">{firstItem.category}</span>
                            </div>
                            <div className="slot-actions">
                                <Link to={`/experiences/${firstItem.id}`} className="btn-slot-view">Dettagli</Link>
                                <button className="btn-slot-remove" onClick={() => removeToCompare(firstItem.id)}>✕</button>
                            </div>
                        </div>
                    )}

                    {/* SLOT 2 */}
                    {secondItem ? (
                        <div className="compare-slot filled">
                            <div className="slot-info">
                                <h4>{secondItem.title}</h4>
                                <span className="slot-badge">{secondItem.category}</span>
                            </div>
                            <div className="slot-actions">
                                <Link to={`/experiences/${secondItem.id}`} className="btn-slot-view">Dettagli</Link>
                                <button className="btn-slot-remove" onClick={() => removeToCompare(secondItem.id)}>✕</button>
                            </div>
                        </div>
                    ) : (
                        <div className="compare-slot empty">
                            <p>Aggiungi una seconda esperienza per il confronto...</p>
                        </div>
                    )}

                </div>
            </div>
        )}
        {/* Invochiamo il componente separato passandogli lo stato e gli ID */}
        <CompareModal
            isOpen={isModalOpen}
            onClose={handleModalClosure}
            itemIds={itemIds}
        />
    </>)
}