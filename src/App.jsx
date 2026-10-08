import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext"
import { CompareProvider } from "./context/CompareContext"
//import pagine
import Home from "./pages/Home"
import ExpDetail from "./pages/ExpDetail";
import FavoritesPage from "./pages/FavoritesPage";
import ComparePage from "./pages/ComparePage";
//import layouts
import DefaultLayout from "./layouts/DefaultLayouts";

function App() {

  return (
    <FavoritesProvider>
      <CompareProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/experiences/:id" element={<ExpDetail />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/compare" element={<ComparePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CompareProvider>
    </FavoritesProvider>
  )
}

export default App
