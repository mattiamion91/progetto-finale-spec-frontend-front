import { useParams, useNavigate } from "react-router-dom"
import { getDataById } from "../services/api"
import { useEffect, useState } from "react"

export default function ExpDetail() {
    //recuepro id da url
    const { id } = useParams()
    const navigate = useNavigate()
    //stato per esperienza
    const [experience, setExperience] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    //mostro dettagli esperienza al montaggio del componente
    useEffect(() => {
        const fetchData = async () => {
            //attivo loader in attesa dei dati
            setIsLoading(true)
            const data = await getDataById(id)
            setExperience(data)
            setIsLoading(false)
        }
        fetchData()
    }, [id])

    if (isLoading) return <p>Caricamento...</p>
    if (!experience) return <p>Esperienza non trovata</p>

    return (
        <div className="detail-page">
            <button className="btn-back" onClick={() => navigate(-1)}>← Idietro</button>
            <img src={experience.image} alt={experience.title} />
            <h1>{experience.title}</h1>
            <p><strong>Luogo:</strong> {experience.location}</p>
            <p><strong>Categoria:</strong> {experience.category}</p>
            <p><strong>Durata:</strong> {experience.duration}</p>
            <p><strong>Prezzo:</strong> {experience.price}€</p>
            <p><strong>Descrizione:</strong> {experience.description}</p>
            <p><strong>Equipaggiamento:</strong> {experience.equipment.join(", ")}</p>
        </div>
    )
}