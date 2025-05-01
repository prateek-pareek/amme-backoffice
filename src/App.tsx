import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import NoteDeSatisfaction from "./components/Statistiques/NoteDeSatisfaction";
import ArgentGenere from "./components/Statistiques/ArgentGenere";
import SideBar from "./components/SideBar";
import ResetPassword from "./components/ResetPassword";
import SuccessScreen from "./components/SuccessScreen";
function App() {
  const location = useLocation();
  // List of routes where the sidebar should not be displayed
  const noSidebarRoutes = [
    "/",
    "/page2",
    "/page3",
    "/resetPassword",
    "/success",
  ];

  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {/* Sidebar */}
      {shouldShowSidebar && <SideBar />}
      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Routes without sidebar */}
          <Route path="/" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/success" element={<SuccessScreen />} />

          {/* Routes with sidebar */}
          <Route
            path="/access-administration"
            element={<AccessAdministration />}
          />
          <Route path="/statistiques" element={<NombrePrestations />} />
          <Route
            path="/statistiques/prestations"
            element={<NombrePrestations />}
          />
          <Route path="/statistiques/argent" element={<ArgentGenere />} />
          <Route path="/statistiques/carte" element={<CarteParRegion />} />
          <Route
            path="/statistiques/satisfaction"
            element={<NoteDeSatisfaction />}
          />
          <Route path="/planning" element={<Planning />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/salaires" element={<Salaires />} />
          <Route path="/factures" element={<Factures />} />
          <Route path="/conges-payes" element={<Conges />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
