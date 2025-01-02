import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Planning from "./components/Planning/Planning";
import Presentation from "./components/Presentation/Presentation";
import Salaires from "./components/Salaires/Salaires";
import Factures from "./components/Factures/Factures";
import Conges from "./components/Conges/Conges";
import AccessAdministration from "./components/Access administration/AccessAdministration";
import Page4 from "./components/Page4";
import CarteParRegion from "./components/Statistiques/CarteParRegion";
import NombrePrestations from "./components/Statistiques/NombrePrestations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route
          path="/access-administration"
          element={<AccessAdministration />}
        />
        <Route path="/statistiques" element={<Page4 />} />
        <Route path='/statistiques/prestations' element={<NombrePrestations />} />
        <Route path='/statistiques/argent' element={<Page4 />} />
        <Route path="/statistiques/carte" element={<CarteParRegion />} />
        <Route path="/statistiques/satisfaction" element={<Page4 />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/Salaires" element={<Salaires />} />
        <Route path="/factures" element={<Factures />} />
        <Route path="/conges-payes" element={<Conges />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
