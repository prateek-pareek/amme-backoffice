import React, { useState } from 'react';
import NombrePrestations from './NombrePrestations';
import ArgentGenere from './ArgentGenere';
import CarteParRegion from './CarteParRegion';
import NoteDeSatisfaction from './NoteDeSatisfaction';


type SubPage = 'Nombre de prestations' | 'Argent généré' | 'Carte par région' | 'Note de satisfaction';

interface StatistiquesProps {
  defaultSection?: SubPage;
}
const Statistiques: React.FC<StatistiquesProps> = ({ defaultSection = 'Nombre de prestations' }) => {
  const [activeSubPage, setActiveSubPage] = useState<SubPage>(defaultSection);

  const handleSubPageChange = (subPage: SubPage) => {
    setActiveSubPage(subPage);
  };

  const renderSubPage = () => {
    switch (activeSubPage) {
      case 'Nombre de prestations':
        return <NombrePrestations />;
      case 'Argent généré':
        return <ArgentGenere />;
      case 'Carte par région':
        return <CarteParRegion />;
      case 'Note de satisfaction':
        return <NoteDeSatisfaction />;
      default:
        return <NombrePrestations />; // Default if no page matches
    }
  };

  return (
    <div>
      {/* Sub-navigation within the section */}
      <div className="stat-sub-navigation">
        <button
          className={activeSubPage === 'Nombre de prestations' ? 'active' : ''}
          onClick={() => handleSubPageChange('Nombre de prestations')}
        >
          Nombre de prestations
        </button>
        <button
          className={activeSubPage === 'Argent généré' ? 'active' : ''}
          onClick={() => handleSubPageChange('Argent généré')}
        >
          Argent généré
        </button>
        <button
          className={activeSubPage === 'Carte par région' ? 'active' : ''}
          onClick={() => handleSubPageChange('Carte par région')}
        >
          Carte par région
        </button>
        <button
          className={activeSubPage === 'Note de satisfaction' ? 'active' : ''}
          onClick={() => handleSubPageChange('Note de satisfaction')}
        >
          Note de satisfaction
        </button>
      </div>

      {renderSubPage()}
    </div>
  );
};

export default Statistiques;