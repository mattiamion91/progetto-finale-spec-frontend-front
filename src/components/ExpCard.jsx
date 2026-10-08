import React from "react";
import { Link } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import { useFavorites } from "../context/FavoritesContext";

export default function Expcard({ exp }) {
    //estraggo le funzioni dai contesti
    const { addToCompare, removeToCompare, clearCompare, itemsToCompare } = useCompare()
    const { favorites, toggleFavorites, isFav } = useFavorites()
    //verifico stato corrente per elemento selezionato
    const favorited = isFav(exp.id)
    const isCompared = itemsToCompare.some(item => item.id === exp.id)

    return (
        <div className="card-exp">
            <Link to={`/experiences/${exp.id}`}><h3>{exp.title}</h3></Link>
            <p><strong>Categoria:</strong> {exp.category}</p>
            <div className="btn-sec">
                <button
                    className="btn-fav"
                    onClick={() => toggleFavorites(exp)}>
                    {favorited ? '❤️ Rimuovi dai Preferiti' : '🤍 Aggiungi ai Preferiti'}
                </button>
                <button
                    className="btn-comp"
                    onClick={() => isCompared ? removeToCompare(exp.id) : addToCompare(exp)}>
                    {isCompared ? '⚖️ In Comparazione' : '⚖️ Confronta'}
                </button>
            </div>
        </div>

    )

}