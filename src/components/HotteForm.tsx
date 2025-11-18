import React, { useState } from 'react';
import { Calendar, CheckCircle2, AlertTriangle, XCircle, Camera } from 'lucide-react';
import type { Cabinet } from '../data/cabinets';

import logo from "../assets/images/logo.png";
import sig1 from "../assets/images/sig1.png";
import sig2 from "../assets/images/sig2.png";

interface HotteFormProps {
  selectedCabinet: Cabinet;
  selectedDate: string;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
  setSelectedDate: (date: string) => void;
  inspectionStatus: Record<string, string>;
  handleStatusChange: (item: string, value: string) => void;
  remarks: string;
  setRemarks: (remarks: string) => void;
  croppedImage: string | null;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCameraCapture: () => void;
}

const getStatusDisplay = (status: string) => {
  switch (status) {
    case 'conforme':
      return (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span className="text-sm text-green-700 font-medium">Conforme</span>
        </div>
      );
    case 'sous-reserve':
      return (
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span className="text-sm text-amber-700 font-medium">Sous Réserve</span>
        </div>
      );
    case 'non-conforme':
      return (
        <div className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-500" />
          <span className="text-sm text-red-700 font-medium">Non Conforme</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-gray-300" />
          <span className="text-sm text-gray-400 font-medium">Non Evalué</span>
        </div>
      );
  }
};

export function HotteForm({
  selectedCabinet,
  selectedDate,
  showDatePicker,
  setShowDatePicker,
  setSelectedDate,
  inspectionStatus,
  handleStatusChange,
  remarks,
  setRemarks,
  croppedImage,
  handleImageUpload,
  handleCameraCapture
}: HotteFormProps) {
  const [airSpeed, setAirSpeed] = useState<string>('');

  const functionalItems = [
    { key: 'ventilateur', label: 'Ventilation / Extracteur' },
    { key: 'eclairage', label: 'Éclairage' },
    { key: 'guillotine', label: 'Guillotine / Ouverture' },
    { key: 'alarme', label: 'Alarme de sécurité' }
  ];

  const structuralItems = [
    { key: 'vitre', label: 'Façade vitrée' },
    { key: 'parois', label: 'Parois (intérieur et extérieur)' },
    { key: 'etancheite_extraction', label: "Etanchéité circuit d'extraction" },
    { key: 'proprete_extraction', label: "Etat de propreté circuit d'extraction" }
  ];

  const defaultThresholds = {
    min: 0.40,
    max: 0.60,
    warning: 0.35
  };

  const thresholds = selectedCabinet.airVelocityThresholds || defaultThresholds;

  // Format the reference string by replacing | with line breaks
  const formattedReference = selectedCabinet.reference.split('|').join('\n');

  return (
    <div>
      <div className="flex justify-center items-center mb-3 sm:mb-4 pb-2 sm:pb-3 border-b">
        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt="HYGITEK"
            className="h-16 sm:h-20 md:h-24 object-contain mb-1"
          />
          <div className="text-[10px] sm:text-xs text-gray-600 font-medium">Pole Expertise</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white text-center py-1.5 sm:py-2 rounded-lg mb-3 sm:mb-4 font-bold text-lg sm:text-xl tracking-wide shadow-sm">
        HOTTE
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center py-1 sm:py-1.5 rounded-lg mb-3 sm:mb-4 font-medium tracking-wide shadow-sm text-xs sm:text-sm">
        {selectedCabinet.establishment}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="border rounded-lg p-2 flex items-center bg-gray-50 shadow-sm">
          <span className="text-xs font-bold min-w-16 text-gray-700">Date:</span>
          <div className="flex-1 flex items-center gap-1">
            <span className="text-xs">{selectedDate}</span>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="p-1 hover:bg-gray-200 rounded-md transition-colors print:hidden pdf-hide"
            >
              <Calendar size={14} className="text-gray-600" />
            </button>
            {showDatePicker && (
              <div className="absolute mt-2 bg-white rounded-lg shadow-xl border p-2 z-10">
                <input
                  type="date"
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    const formattedDate = date.toLocaleDateString('fr-FR');
                    setSelectedDate(formattedDate);
                    setShowDatePicker(false);
                  }}
                  className="p-2 border rounded-md"
                />
              </div>
            )}
          </div>
        </div>
        <div className="border rounded-lg p-2 flex items-center bg-gray-50 shadow-sm">
          <span className="text-xs font-bold min-w-16 text-gray-700">Identifiant:</span>
          <span className="text-xs flex-1">{selectedCabinet.identification}</span>
        </div>
        <div className="border rounded-lg p-2 flex items-center bg-gray-50 shadow-sm">
          <span className="text-xs font-bold min-w-16 text-gray-700">Salle:</span>
          <span className="text-xs flex-1">{selectedCabinet.room}</span>
        </div>
        <div className="border rounded-lg p-2 flex flex-col bg-gray-50 shadow-sm">
          <span className="text-xs font-bold text-gray-700">S/N:</span>
          <div className="text-[10px] leading-tight mt-1 text-gray-600 whitespace-pre-line">
            {formattedReference}
          </div>
        </div>
      </div>

      <table className="w-full mb-6 border-collapse shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left font-bold text-gray-700 border">Evaluation état de l'appareillage</th>
            <th className="p-3 w-32 font-bold text-gray-700 border text-center">Conformité</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border" colSpan={2}>
              <div className="flex">
                <div className="w-32 p-3 bg-blue-50 border-r">
                  <div className="font-bold text-blue-800">Fonctionnel</div>
                </div>
                <div className="flex-1">
                  {functionalItems.map((item) => (
                    <div key={item.key} className="flex border-b last:border-b-0">
                      <div className="flex-1 p-3 pl-6">{item.label}</div>
                      <div className="w-32 p-3 border-l flex justify-center">
                        {getStatusDisplay(inspectionStatus[item.key])}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border" colSpan={2}>
              <div className="flex">
                <div className="w-32 p-3 bg-blue-50 border-r">
                  <div className="font-bold text-blue-800">Structurel</div>
                </div>
                <div className="flex-1">
                  {structuralItems.map((item) => (
                    <div key={item.key} className="flex border-b last:border-b-0">
                      <div className="flex-1 p-3 pl-6">{item.label}</div>
                      <div className="w-32 p-3 border-l flex justify-center">
                        {getStatusDisplay(inspectionStatus[item.key])}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full mb-6 border-collapse shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th colSpan={3} className="p-3 text-left font-bold text-gray-700 border">
              Evaluation performance aéraulique
            </th>
            <th className="p-3 w-32 font-bold text-gray-700 border text-center">Conformité</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td colSpan={3} className="p-3 border">
              <div className="flex items-center gap-2">
                <span>Etanchéité de l'enceinte de travail (test fumigène)</span>
              </div>
            </td>
            <td className="p-3 border">
              <div className="flex justify-center">
                {getStatusDisplay(inspectionStatus['test_fumigene'])}
              </div>
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-3 border">
              <div className="flex items-center gap-2">
                <div>
                  <div>Vitesse de l'air (m/s) / moyenne</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Norme EN 14175-4 pour sorbonnes de laboratoire
                    <br />
                    Recommendation INRS : 0.40 - 0.60
                    <div className="text-xs text-gray-500 mt-1">
                      Seuil d'acceptabilité : {thresholds.warning}
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td className="p-3 border text-center w-32">
              <div className="text-xs font-medium text-gray-600">Valeur guide (m/s)</div>
              <div>{thresholds.min} - {thresholds.max}</div>
            </td>
            <td className="p-3 border text-center w-32">
              <div className="text-xs font-medium text-gray-600">Valeur mesurée</div>
              <input 
                type="number" 
                step="0.01"
                value={airSpeed}
                className="w-16 p-1 border rounded text-center text-sm"
                placeholder="0.00"
                onChange={(e) => {
                  const value = e.target.value;
                  setAirSpeed(value);
                  const numValue = parseFloat(value);
                  handleStatusChange('vitesse_air', 
                    (numValue >= thresholds.min && numValue <= thresholds.max) ? 'conforme' : 
                    (numValue >= thresholds.warning && numValue < thresholds.max) ? 'sous-reserve' : 
                    'non-conforme'
                  );
                }}
              />
            </td>
            <td className="p-3 border">
              <div className="flex justify-center">
                {getStatusDisplay(inspectionStatus['vitesse_air'])}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <div className="font-bold mb-1 text-gray-700 text-xs">Remarque:</div>
          <textarea 
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full h-48 border border-gray-300 rounded-lg p-2 text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            style={{ borderStyle: 'dashed' }}
          />
        </div>
        <div>
          <div className="font-bold mb-1 text-gray-700 text-xs flex items-center justify-between">
            <span>Photo:</span>
            <button
              onClick={handleCameraCapture}
              className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors print:hidden pdf-hide"
              type="button"
            >
              <Camera size={14} />
              Prendre photo
            </button>
          </div>
          <label
            className="photo-container w-full h-48 border border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 text-xs bg-white cursor-pointer hover:bg-gray-50 transition-all focus:ring-2 focus:ring-blue-500 relative"
            style={{ borderStyle: 'dashed' }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {croppedImage ? (
              <div className="w-full h-full rounded-lg overflow-hidden">
                <img
                  src={croppedImage}
                  alt="Uploaded"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
                  <span className="text-transparent hover:text-white transition-colors font-medium">
                    Cliquer pour modifier
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center p-4">
                <p className="font-medium">Drop photo here </p>
                <p className="text-xs mt-1 text-gray-500">or click to select</p>
              </div>
            )}
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <div className="font-bold mb-2 text-gray-700 text-xs">Identification et VISA Contrôleur:</div>
          <div className="w-full h-28 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
            <img 
              src={sig1}
              alt="Signature Contrôleur" 
              className="max-h-full object-contain p-3"
            />
          </div>
        </div>
        <div>
          <div className="font-bold mb-2 text-gray-700 text-xs">Identification et VISA Maintenance:</div>
          <div className="w-full h-28 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
            <img 
              src={sig2}
              alt="Signature Maintenance" 
              className="max-h-full object-contain p-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}