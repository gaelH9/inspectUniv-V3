import React, { useState } from 'react';
import { X, Eraser, CheckCircle2, AlertTriangle, XCircle, Calendar, MinusCircle } from 'lucide-react';

interface QuickRemarksProps {
  deviceType: 'sorbonne' | 'armoire' | 'psm';
  currentRemarks: string;
  onUpdateRemarks: (remarks: string) => void;
  inspectionStatus: Record<string, string>;
  handleStatusChange: (item: string, value: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const criteriaList = {
  sorbonne: [
    { key: 'ventilateur', label: 'Ventilation / Extracteur' },
    { key: 'eclairage', label: 'Éclairage' },
    { key: 'guillotine', label: 'Guillotine / Ouverture' },
    { key: 'alarme', label: 'Alarme de sécurité' },
    { key: 'vitre', label: 'Façade vitrée' },
    { key: 'parois', label: 'Parois (intérieur et extérieur)' },
    { key: 'etancheite_extraction', label: "Etanchéité circuit d'extraction" },
    { key: 'proprete_extraction', label: "Etat de propreté circuit d'extraction" },
    { key: 'test_fumigene', label: "Test fumigène" },
    { key: 'vitesse_air', label: "Vitesse de l'air" }
  ],
  armoire: [
    { key: 'extracteur', label: 'Extracteur' },
    { key: 'filtre', label: 'Filtre' },
    { key: 'etageres', label: 'Etagères' },
    { key: 'portes', label: 'Portes' },
    { key: 'interieur', label: 'Intérieur' },
    { key: 'exterieur', label: 'Extérieur' },
    { key: 'etancheite', label: 'Etanchéité enceinte' },
    { key: 'depression', label: 'Mise en dépression' }
  ],
  psm: [
    { key: 'ventilateur', label: 'Ventilation' },
    { key: 'eclairage', label: 'Éclairage' },
    { key: 'vitre', label: 'Vitre de protection' },
    { key: 'alarme', label: 'Alarme' }
  ]
};

const remarksData = {
  sorbonne: [
    { key: "New ID", "text": "Nouvel identifiant attribué. Une étiquette sera apposée sur l'appareil." },
    { key: "Débit NC", "text": "Débit d'air non conforme au paramètres." },
    { key: "Obstruer", "text": "Appareil obstrué par du matériel" },
    { key: "Fuite", "text": "Présence de fuite détectée, contrôle de l'étanchéité recommandé." },
    { key: "Éclairage", "text": "Éclairage défectueux, remplacement nécessaire." },
    { key: "Guillotine", "text": "Problème d'ouverture/fermeture de la guillotine, maintenance requise." },
    { key: "Alarme HS", "text": "Alarme de sécurité non fonctionnelle, intervention urgente requise." },
    { key: "Alarme ON", "text": "Alarme de sécurité non fonctionnelle, se déclanche sans raison." },
    { key: "Extraction", "text": "Circuit d'extraction encrassé." },
    { key: "Test fumigène", "text": "Test fumigène non concluant." },
    { key: "Structure", "text": "Dégradation de la façade vitrée ou des parois." },
    { key: "Maintenance", "text": "Maintenance préventive recommandée pour éviter une détérioration future." }
  ],
  armoire: [
    { key: 'PressionPSI OK', text: 'La pression interne de l’armoire chimique a été mesurée afin d’attester de sa dépression opérationnelle.\n Pression enregistrée (Pa) : ' },
     { key: 'PressionPSI ERROR', text: 'La pression interne de l’armoire chimique a été mesurée afin d’attester de sa dépression opérationnelle.\n Celle ci n\'est pas en dépression ! Extraction défectueuse.' },
    { key: 'info2', text: 'Aucune valeur minimale normative n’est définie pour la requalification des armoires chimiques ventilées.' },
    { key: "New ID", "text": "Nouvel identifiant attribué. Une étiquette sera apposée sur l'appareil." },
    { key: 'Ventilation', text: 'Ventilation absente ou inefficace.' },
    { key: 'Séparation', text: 'Stockage non conforme des produits.' },
    { key: 'Étiquetage', text: 'Étiquettes absentes ou illisibles.' },
    { key: 'Fuites', text: 'Présence de fuites ou résidus chimiques.' },
    { key: 'Rétention abs', text: 'Bac de rétention manquant.' },
    { key: 'Corrosion', text: 'Traces de corrosion sur l\'armoire.' },
    { key: 'Serrures', text: 'Serrure défectueuse' },
    { key: 'Ventilation', text: 'Ventilation absente ou inefficace.' }
  ],
  psm: [
    { key: "New ID", "text": "Nouvel identifiant attribué. Une étiquette sera apposée sur l'appareil." },
    { key: 'Flux', text: 'Flux laminaire perturbé.' },
    { key: 'Filtres', text: 'Filtres HEPA encrassés.' },
    { key: 'Éclairage', text: 'Éclairage insuffisant.' },
    { key: 'Certification', text: 'Absence de certification récente.' }
  ]
};

export function QuickRemarks({ 
  deviceType, 
  currentRemarks, 
  onUpdateRemarks,
  inspectionStatus,
  handleStatusChange,
  selectedDate,
  setSelectedDate
}: QuickRemarksProps) {
  const [dateInput, setDateInput] = useState(selectedDate);

  const addRemark = (text: string) => {
    const newRemarks = currentRemarks
      ? `${currentRemarks}\n${text}`
      : text;
    onUpdateRemarks(newRemarks);
  };

  const clearRemarks = () => {
    onUpdateRemarks('');
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDateInput(newDate);
    setSelectedDate(newDate);
  };

  const handleNotEvaluated = () => {
    // Réinitialiser tous les critères à leur état initial (non évalué)
    criteriaList[deviceType].forEach(({ key }) => {
      handleStatusChange(key, '');
    });
    
    // Ajouter la remarque
    const notEvaluatedRemark = "Non évalué - Inspection non réalisée - HS";
    onUpdateRemarks(notEvaluatedRemark);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Date Input */}
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-gray-700">Date d'inspection</span>
          <Calendar size={16} className="text-gray-500" />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={dateInput}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="JJ/MM/AA"
          />
        </div>
      </div>

      {/* Critères d'évaluation */}
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-gray-700">Critères d'évaluation</span>
          <button
            onClick={handleNotEvaluated}
            className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors text-xs font-medium"
          >
            <MinusCircle size={14} />
            Non Évalué
          </button>
        </div>
        <div className="space-y-2">
          {criteriaList[deviceType].map(({ key, label }) => (
            <div key={key} className="p-2 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-2">{label}</div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleStatusChange(key, 'conforme')}
                  className={`p-2 rounded-lg transition-all ${
                    inspectionStatus[key] === 'conforme'
                      ? 'bg-green-100 text-green-700 ring-2 ring-green-500'
                      : 'hover:bg-green-50 text-gray-400 hover:text-green-600'
                  }`}
                  title="Conforme"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleStatusChange(key, 'sous-reserve')}
                  className={`p-2 rounded-lg transition-all ${
                    inspectionStatus[key] === 'sous-reserve'
                      ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-500'
                      : 'hover:bg-amber-50 text-gray-400 hover:text-amber-600'
                  }`}
                  title="Sous réserve"
                >
                  <AlertTriangle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleStatusChange(key, 'non-conforme')}
                  className={`p-2 rounded-lg transition-all ${
                    inspectionStatus[key] === 'non-conforme'
                      ? 'bg-red-100 text-red-700 ring-2 ring-red-500'
                      : 'hover:bg-red-50 text-gray-400 hover:text-red-600'
                  }`}
                  title="Non conforme"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phrases rapides */}
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-gray-700">Phrases rapides</span>
          <button
            onClick={clearRemarks}
            className="p-1.5 hover:bg-red-50 rounded-md text-red-600 transition-colors flex items-center gap-1 text-xs"
          >
            <Eraser size={14} />
            Effacer
          </button>
        </div>
        <div className="space-y-1.5">
          {remarksData[deviceType].map(({ key, text }) => (
            <button
              key={key}
              onClick={() => addRemark(text)}
              className="w-full text-left px-3 py-1.5 text-xs bg-white hover:bg-blue-50 border border-gray-200 rounded transition-colors flex items-center justify-between group"
            >
              <span className="font-medium text-gray-700">{key}</span>
              <X size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
