import { Link } from "react-router-dom"
export default function MainHeader() {

    return (
        <div className="main-header">
            <Link to={"/"}>Home</Link>
            <Link to={"/favorites"}>Preferiti</Link>
            <Link to={"/compare"}>Comparazione</Link>
        </div>
    )
}