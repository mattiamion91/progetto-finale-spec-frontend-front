import React, { useState, useEffect } from "react"
import { getDataById } from "../services/api"

export default function CompareModal({ isOpen, onClose, itemIds }) {
    //stato per item con tutte le proprita
    const [fullDataItem, setFullDataItem] = useState([])
    //stato loader
    const [isLoading, setIsLoading] = useState(true)
    //fetch delle esperienze al cambio di isOpen e itemIds
    useEffect(() => {
        //se isOpen é false o la lunghezza array itemIds é minore di due non ritornare nulla
        if (!isOpen || itemIds.length < 2) return;

        //fetch dei dati delle due esperienze
        const fetchFullData = async () => {
            //attivo il loader
            setIsLoading(true)
            try {
                const data1 = await getDataById(itemIds[0])
                const data2 = await getDataById(itemIds[1])
                console.log(data1)
                setFullDataItem([data1, data2])
            } catch (err) {
                console.error("Errore del recupero dettagli per modale", err);
            } finally {
                //disattivo il loader
                setIsLoading(false)
            }
        }
        fetchFullData()
    }, [isOpen, itemIds])

    //se la modale non puo essere aperta non redereizzo nulla
    if (!isOpen) return null

    return (<div className="compare-modal-overlay" onClick={onClose}>
        <div className="compare-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
                <h2>Mettiamo a confronto le tue scelte</h2>
                <button className="btn-close-modal" onClick={onClose}>✕</button>
            </div>

            <div className="compare-table-wrapper">
                {isLoading ? (
                    <div className="modal-loading">
                        <p>Caricamento dettagli in corso...</p>
                    </div>
                ) : fullDataItem.length === 2 ? (
                    <table className="compare-table">
                        <thead>
                            <tr>
                                <th>Caratteristica</th>
                                <th>{fullDataItem[0].title}</th>
                                <th>{fullDataItem[1].title}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Anteprima</strong></td>
                                <td><img src={fullDataItem[0].image} alt={fullDataItem[0].title} className="modal-img-thumb" /></td>
                                <td><img src={fullDataItem[1].image} alt={fullDataItem[1].title} className="modal-img-thumb" /></td>
                            </tr>
                            <tr>
                                <td><strong>Categoria</strong></td>
                                <td><span className="slot-badge">{fullDataItem[0].category}</span></td>
                                <td><span className="slot-badge">{fullDataItem[1].category}</span></td>
                            </tr>
                            <tr>
                                <td><strong>Luogo</strong></td>
                                <td>📍 {fullDataItem[0].location}</td>
                                <td>📍 {fullDataItem[1].location}</td>
                            </tr>
                            <tr>
                                <td><strong>Durata</strong></td>
                                <td>🕒 {fullDataItem[0].duration}</td>
                                <td>🕒 {fullDataItem[1].duration}</td>
                            </tr>
                            <tr>
                                <td><strong>Prezzo</strong></td>
                                <td className="compare-price">{fullDataItem[0].price}€</td>
                                <td className="compare-price">{fullDataItem[1].price}€</td>
                            </tr>
                            <tr>
                                <td><strong>Equipaggiamento</strong></td>
                                <td>{fullDataItem[0].equipment?.join(", ") || "Nessuno"}</td>
                                <td>{fullDataItem[1].equipment?.join(", ") || "Nessuno"}</td>
                            </tr>
                            <tr>
                                <td><strong>Descrizione</strong></td>
                                <td className="modal-desc-cell">{fullDataItem[0].description}</td>
                                <td className="modal-desc-cell">{fullDataItem[1].description}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>Impossibile generare il confronto al momento.</p>
                )}
            </div>
        </div>
    </div>)
}