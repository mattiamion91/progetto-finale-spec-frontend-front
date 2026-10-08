import React, { createContext, useContext, useEffect, useState, } from "react";

//definisco contesto
const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
    //inizializzo lo stato leggenndo dal localStorage se esiste
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("veneto-favs");
        return saved ? JSON.parse(saved) : []
    })

    //qunado cambiano i "favorites" aggiorno il localStorage
    useEffect(() => {
        localStorage.setItem("veneto-favs", JSON.stringify(favorites))
    }, [favorites])

    //funzione per aggiungere o rimuovere "favorites" (toggle)
    const toggleFavorites = (experience) => {
        setFavorites((prev) => {
            const isAlreadyFav = prev.find(item => item.id === experience.id)
            if (isAlreadyFav) {
                //se é gia presente lo togliamo
                return prev.filter(item => item.id !== experience.id)
            } else {
                //lo aggiuggiamo
                return [...prev, experience]
            }
        })
    }

    //funzione per sapere se un experience é presente nei favorites
    const isFav = (id) => favorites.some(item => item.id === id);

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                toggleFavorites,
                isFav
            }}>
            {children}
        </FavoritesContext.Provider>
    )

}
//hook per usare contesto
export const useFavorites = () => {
    const context = useContext(FavoritesContext)
    if (!context) {
        throw new Error("useFavorites deve essere usato dentro un FavoritesProvider'")
    }
    return context
}