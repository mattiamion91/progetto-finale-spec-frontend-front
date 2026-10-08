//importo contesto FavoritesContext
import { useFavorites } from "../context/FavoritesContext"
//importo la card
import Expcard from "../components/ExpCard"
export default function FavoritesPage() {
    //estraggo lista preferiti e toggleFavorites dal contesto
    const { favorites, toggleFavorites } = useFavorites()
    //constante booleana per capire se la lista é vuota
    const hasFovorites = favorites.length > 0

    return (
        <div className="favorites-container">
            <h2>Lista Preferiti</h2>
            {/*rendering condizionale se non ci sono elementi o se ci sono elemeti*/}
            {!hasFovorites ? (
                <div className="favorites-empty-list">
                    <p>Non ci  sono esperienze preferite nella lista</p>
                </div >
            ) : (
                <div className="favorites-list">
                    {favorites.map((exp) => (
                        <Expcard
                        key={exp.id}
                        exp={exp}/>
                    ))}
                </div>
            )}
        </div>
    )
}