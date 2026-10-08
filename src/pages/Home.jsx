import { useEffect, useState } from "react"
import { getData } from "../services/api"
//importo card
import Expcard from "../components/ExpCard"

//hardcoded array delle categorie
const categories = ["Cultura", "Sport", "Enogastronomia"]

const Home = () => {
    //stato esperienze
    const [experiences, setExperiences] = useState([]);
    //stato loader e lo inizializzo come falso
    const [isLoading, setIsLoading] = useState(false);
    //stati ricerca e filtri
    const [search, setSearch] = useState("");
    const [selectedCat, setSelectedCat] = useState("");
    const [sortBy, setSortBy] = useState("");
    //aggiorno il componente alla modifica di "search" e "selectCat"
    useEffect(() => {
        //var per il fetch iniziale
        const fetchInitialData = async () => {
            //attivo il loader in attesa dei dati
            setIsLoading(true);
            //recupero i dati dal BE
            const data = await getData(search, selectedCat);
            //popolo array di esperienze usando la var di stato
            setExperiences(data);
            //disattivo il loader
            setIsLoading(false);
        }
        fetchInitialData()
    }, [search, selectedCat])

    //funzione gestione sort
    const handleSort = () => {
        //copio array esperienze
        const sortedExp = [...experiences];
        if (sortBy === "title-asc") {
            return sortedExp.sort((a, b) => a.title.localeCompare(b.title))
        }
        if (sortBy === "title-desc") {
            return sortedExp.sort((a, b) => b.title.localeCompare(a.title))
        }
        if (sortBy === "cat-asc") {
            return sortedExp.sort((a, b) => a.category.localeCompare(b.category))
        }
        if (sortBy === "cat-desc") {
            return sortedExp.sort((a, b) => b.category.localeCompare(a.category))
        }
        return sortedExp //se non c'é ordinamento restituisci array originale
    }

    //var che torna risutlato funzione hanldeSort
    const displaySortExp = handleSort()

    return (
        <div className="home-container">
            <h2>Scopri le esperienze in Veneto</h2>

            <div className="filter-bar">
                <label><strong>Inserisci...</strong>
                    <input
                        type="text"
                        placeholder="Cerca..."
                        value={search}
                        onChange={e => setSearch(e.target.value)} />
                </label>
                <label><strong>Scegli categoria</strong>
                    <select
                        value={selectedCat}
                        onChange={e => setSelectedCat(e.target.value)}>
                        <option value="">Tutte le categorie</option>
                        {categories.map((dc) => (
                            <option
                                key={dc}
                                value={dc}>
                                {dc}
                            </option>
                        ))}
                    </select>
                </label>
                <label>Ordina per
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}>
                        <option value="">Ordina per...</option>
                        <option value="title-asc">Titolo A-Z</option>
                        <option value="title-desc">Titolo Z-A</option>
                        <option value="cat-asc">Categoria A-Z</option>
                        <option value="cat-desc">Categoria Z-A</option>
                    </select>
                </label>
            </div>
            {isLoading ? (<div className="isLoading">Aggiornamento dati in corso...</div>
            ) : displaySortExp.length === 0 ? (
                <p>Nessuna esperienza trovata nel database</p>
            ) : (
                <div className="experiences-container">
                    {displaySortExp.map((exp) => ( 
                        <Expcard 
                        key={exp.id}
                        exp={exp}/>
                    ))}                      
                   
                </div>
            )}
        </div>
    )
}

export default Home
