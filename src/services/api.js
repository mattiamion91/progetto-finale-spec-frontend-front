//indirizzo del mio backend
const URL_BE = "http://localhost:3001"

//passo alla funzione getData search e category inizialmente come stringhe vuote
export const getData = async (search = "", category = "") => {
    try {//costruisco url per fetch in modo dinamico
        let url = `${URL_BE}/experiences?`
        //se search esiste aggiungi stringa a url
        if (search) url += `search=${encodeURIComponent(search)}&`;
        //se category esiste aggiugi a url il resto della stringa
        if (category) url += `category=${encodeURIComponent(category)}`
        //mi torno una response usando fetch
        const res = await fetch(url)
        //verifico che la mia res esista
        if (!res) throw new Error(`Errore Server ${res.status}`);
        //ritorno il json
        return await res.json()
    } catch (err) {
        console.error(`Errore durante fetch esperienze`, err);
        //ritorno un array vuoto
        return []
    }
}

export const getDataById = async (id) => {
    try {
        const url = `${URL_BE}/experiences/${id}`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Errore Server: ${res.status}`)
        const data = await res.json()
        return data.experience
    } catch (err) {
        console.error(err);
        return {}
    }

}