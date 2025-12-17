import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, AlertTriangle, XCircle, Camera } from 'lucide-react';
import type { Cabinet } from '../data/cabinets';

import logo from "../assets/images/logo.png";
import sig1 from "../assets/images/sig1.png";
import sig2 from "../assets/images/sig2.png";

interface ChemicalCabinetFormProps {
  selectedCabinet: Cabinet;
  customIdentification: string;
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
  const base = "inline-flex items-center gap-2 whitespace-nowrap text-xs font-semibold leading-none";
  const iconCls = "w-4 h-4 flex-shrink-0";

  switch (status) {
    case 'conforme':
      return (
        <div className={base}>
          <CheckCircle2 className={`${iconCls} text-green-500`} />
          <span className="text-green-700">Conforme</span>
        </div>
      );
    case 'sous-reserve':
      return (
        <div className={base}>
          <AlertTriangle className={`${iconCls} text-amber-500`} />
          <span className="text-amber-700">Sous Réserve</span>
        </div>
      );
    case 'non-conforme':
      return (
        <div className={base}>
          <XCircle className={`${iconCls} text-red-500`} />
          <span className="text-red-700">Non Conforme</span>
        </div>
      );
    default:
      return (
        <div className={`${base} text-gray-400`}>
          <CheckCircle2 className={`${iconCls} text-gray-300`} />
          <span>Non Évalué</span>
        </div>
      );
  }
};

export function ChemicalCabinetForm({
  selectedCabinet,
  customIdentification,
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
}: ChemicalCabinetFormProps) {
  const [psiValue, setPsiValue] = useState<string>('');
  const [debitValue, setDebitValue] = useState<string>('');
  const [debitUnit, setDebitUnit] = useState<string>('m³/h');

  useEffect(() => {
    if (!croppedImage && remarks === '') {
      setPsiValue('');
      setDebitValue('');
      setDebitUnit('m³/h');
    }
  }, [croppedImage, remarks]);

  const functionalItems = [
    { key: 'extracteur', label: 'Extracteur' },
    { key: 'filtre', label: 'Filtre' }
  ];

  const structuralItems = [
    { key: 'etageres', label: 'Etagères' },
    { key: 'portes', label: 'Portes' },
    { key: 'interieur', label: 'Intérieur' },
    { key: 'exterieur', label: 'Extérieur' },
    { key: 'etancheite', label: 'Etanchéité enceinte' }
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-center items-center mb-3 border-b pb-2 pt-1">
        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-[150px] object-contain"
          />
        </div>
      </div>

      {/* Titre */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white
        flex items-center justify-center
        h-9
        rounded-md
        mb-2
        font-bold text-base
        leading-none
        tracking-wide">
        ARMOIRE CHIMIQUE
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-purple-800
        text-white
        flex items-center justify-center
        h-7
        rounded-md
        mb-2
        text-xs font-medium
        leading-none">
        {selectedCabinet.establishment}
      </div>

      {/* En-tête */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="relative border rounded-md px-2 py-2 flex items-center justify-between bg-white">
          <span className="text-[11px] font-semibold text-gray-500">Date</span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-900">{selectedDate}</span>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors print:hidden pdf-hide"
              aria-label="Choisir une date"
            >
              <Calendar size={14} className="text-gray-500" />
            </button>
          </div>

          {showDatePicker && (
            <div className="absolute right-2 top-full mt-2 bg-white rounded-md shadow-lg border p-2 z-10 print:hidden pdf-hide">
              <input
                type="date"
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  const formattedDate = date.toLocaleDateString("fr-FR");
                  setSelectedDate(formattedDate);
                  setShowDatePicker(false);
                }}
                className="px-2 py-1 border rounded-md text-sm"
              />
            </div>
          )}
        </div>

        <div className="border rounded-md px-2 py-2 flex items-center justify-between bg-white">
          <span className="text-[11px] font-semibold text-gray-500">Identifiant</span>
          <span className="text-xs font-medium text-gray-900">{customIdentification}</span>
        </div>

        <div className="border rounded-md px-2 py-2 flex items-center justify-between bg-white">
          <span className="text-[11px] font-semibold text-gray-500">Salle</span>
          <span className="text-xs font-medium text-gray-900">{selectedCabinet.room}</span>
        </div>

        <div className="border rounded-md px-2 py-2 flex items-center justify-between bg-white">
          <span className="text-[11px] font-semibold text-gray-500">S/N</span>
          <span className="text-xs font-medium text-gray-900">{selectedCabinet.reference}</span>
        </div>
      </div>

      {/* Tableau */}
      <table className="w-full mb-3 border-collapse shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left font-bold text-gray-700 border text-sm">Evaluation état de l'appareillage</th>
            <th className="p-2 w-44 font-bold text-gray-700 border text-center text-sm">Conformité</th>
          </tr>
        </thead>

        <tbody>
          {/* Fonctionnel */}
          <tr>
            <td className="border" colSpan={2}>
              <div className="flex">
                <div className="w-32 p-2 bg-blue-50 border-r">
                  <div className="font-bold text-blue-800 text-sm">Fonctionnel</div>
                </div>

                <div className="flex-1">
                  {functionalItems.map((item) => (
                    <div key={item.key} className="flex border-b last:border-b-0">
                      <div className="flex-1 p-2 pl-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm">{item.label}</span>

                          {item.key === 'extracteur' && (
                            <div className="flex items-center gap-2 text-[11px] text-gray-600">
                              <span className="font-medium">Information débit:</span>
                              <input
                                type="number"
                                step="0.1"
                                value={debitValue}
                                onChange={(e) => setDebitValue(e.target.value)}
                                className="w-16 px-2 py-1 border rounded text-center text-[11px]"
                                placeholder="0.0"
                              />
                              <select
                                value={debitUnit}
                                onChange={(e) => setDebitUnit(e.target.value)}
                                className="px-2 py-1 border rounded text-[11px]"
                              >
                                <option value="m³/h">m³/h</option>
                                <option value="m/s">m/s</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>

                     <div className="w-44 p-2 border-l flex items-center justify-center h-[44px]">
                        {getStatusDisplay(inspectionStatus[item.key])}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </td>
          </tr>

          {/* Structurel */}
          <tr>
            <td className="border" colSpan={2}>
              <div className="flex">
                <div className="w-32 p-2 bg-blue-50 border-r">
                  <div className="font-bold text-blue-800 text-sm">Structurel</div>
                </div>

                <div className="flex-1">
                  {structuralItems.map((item) => (
                    <div key={item.key} className="flex border-b last:border-b-0">
                      <div className="flex-1 p-2 pl-4 text-sm">{item.label}</div>
                      <div className="w-44 p-2 border-l flex items-center justify-center h-[44px]">
                        {getStatusDisplay(inspectionStatus[item.key])}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </td>
          </tr>

          {/* Sécurité */}
          <tr>
            <td className="border" colSpan={2}>
              <div className="flex">
                <div className="w-32 p-2 bg-blue-50 border-r">
                  <div className="font-bold text-blue-800 text-sm">Principe de sécurité</div>
                </div>

                <div className="flex-1">
                  <div className="flex">
                    <div className="flex-1 p-2 pl-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm">Mise en dépression de l'enceinte</span>

                        <div className="flex items-center gap-2 text-[11px] text-gray-600">
                          <span className="font-medium">PSI:</span>
                          <input
                            type="number"
                            step="0.01"
                            value={psiValue}
                            onChange={(e) => setPsiValue(e.target.value)}
                            className="w-16 px-2 py-1 border rounded text-center text-[11px]"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-44 p-2 border-l flex items-center justify-center h-[44px]">
                      {getStatusDisplay(inspectionStatus['depression'])}
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>

        </tbody>
      </table>

      {/* Bas de page : on utilise l’espace restant */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="font-bold mb-1 text-gray-700 text-[11px]">Remarque:</div>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full h-40 border border-gray-300 rounded-lg p-2 text-xs bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            style={{ borderStyle: 'dashed' }}
          />

          <div className="mt-2">
            <div className="font-bold mb-1 text-gray-700 text-[11px]">Identification et VISA Contrôleur:</div>
            <div className="w-full h-[100px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <img
                src={sig1}
                alt="Signature Contrôleur"
                className="h-full object-contain p-2"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="font-bold mb-1 text-gray-700 text-[11px] flex items-center justify-between">
            <span>Photo:</span>
            <button
              onClick={handleCameraCapture}
              className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-[11px] hover:bg-blue-700 transition-colors print:hidden pdf-hide"
              type="button"
            >
              <Camera size={12} />
              Prendre photo
            </button>
          </div>

          <label
            className="photo-container w-full border border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 text-[11px] bg-white cursor-pointer hover:bg-gray-50 transition-all focus:ring-2 focus:ring-blue-500 relative"
            style={{ borderStyle: 'dashed', height: '300px' }}
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
              <div className="text-center p-3">
                <p className="font-medium">Drop photo here</p>
                <p className="text-[11px] mt-1 text-gray-500">or click to select.</p>
              </div>
            )}
          </label>
        </div>
      </div>

      <div className="mt-2 text-[11px] italic text-gray-500 border-t pt-2">
        Cette évaluation porte sur l’état et le fonctionnement de l’armoire chimique et ne constitue pas une qualification normative métrologique.
      </div>
    </div>
  );
}
