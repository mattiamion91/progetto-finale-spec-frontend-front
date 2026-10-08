import React, { createContext, useState, useContext } from 'react';
//creo il contesto
const CompareContext = createContext()
//esporto il componente
export const CompareProvider = ({ children }) => {
    //stato items da conforntare
    const [itemsToCompare, setItemsToCompare] = useState([])
    //funzione per aggiuggere items da controntare
    const addToCompare = (experience) => {
        setItemsToCompare((prev) => {
            //se item presente non fare nulla
            if (prev.find((item) => item.id === experience.id )) {
                return prev
            }
            //se nel compratore ci sono gia due item avviso utente
            if (prev.length >= 2) {
                alert("Sono presenti giá due elementi da confrontare")
                return prev
            }
            //ritorno experience + item
            return [...prev, experience]
        })
    }
    //funzione per riumuovere esperienza da confrontare
    //mi toran un array (prev) con tutti gli elementi tranne quello con id passato alla funzione
    const removeToCompare = (id) => {
        setItemsToCompare(prev => prev.filter(item => item.id !== id))
    }
    //funzione per svuotare le esperienze da conforntare
    const clearCompare = () => { setItemsToCompare([]) }

    return (<CompareContext.Provider
        value={{
            addToCompare,
            removeToCompare,
            clearCompare,
            itemsToCompare
        }}>
        {children}
    </CompareContext.Provider>)

}
//hook per usare contesto
export const useCompare = () => {
    const context = useContext(CompareContext)
    if (!context) {
        throw new Error("useCompare deve essere usato dentro un CompareProvider'")
    }
    return context
}