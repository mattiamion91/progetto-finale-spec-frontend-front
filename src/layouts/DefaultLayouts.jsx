import CompareBar from "../components/CompareBar";
import MainHeader from "../components/MainHeader";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    return (
        <>
            <MainHeader />
            <Outlet />
            <CompareBar />
        </>
    )
}