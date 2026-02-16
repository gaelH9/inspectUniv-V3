import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, AlertTriangle, XCircle, Camera } from 'lucide-react';
import type { Cabinet } from '../data/cabinets';

import logo from "../assets/images/logo.png";
import sig1 from "../assets/images/sig1.png";
import sig2 from "../assets/images/sig2.png";

/** ✅ VARIABLES DE CONFIGURATION */
const SHOW_EXTRACTEUR_DEBIT_INFO = false; // afficher info débit extracteur
const SHOW_PSI_FIELD = false; // afficher PSI
const DEFAULT_PSI_VALUE = "-1.0"; // PSI par défaut

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

  const [psiValue, setPsiValue] = useState<string>(DEFAULT_PSI_VALUE);
  const [debitValue, setDebitValue] = useState<string>('');
  const [debitUnit, setDebitUnit] = useState<string>('m³/h');

  useEffect(() => {
    if (!croppedImage && remarks === '') {
      setPsiValue(DEFAULT_PSI_VALUE);
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
        <img src={logo} alt="Logo" className="h-[150px] object-contain" />
      </div>

      {/* Titre */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-center h-9 rounded-md mb-2 font-bold text-base">
        ARMOIRE CHIMIQUE
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white flex items-center justify-center h-7 rounded-md mb-2 text-xs font-medium">
        {selectedCabinet.establishment}
      </div>

      {/* En-tête */}
      <div className="grid grid-cols-2 gap-2 mb-3">

        {/* Date */}
        <div className="relative border rounded-md px-2 py-2 flex justify-between bg-white">
          <span className="text-[11px] font-semibold text-gray-500">Date</span>
          <div className="flex gap-2">
            <span className="text-xs">{selectedDate}</span>
            <button onClick={() => setShowDatePicker(!showDatePicker)}>
              <Calendar size={14}/>
            </button>
          </div>

          {showDatePicker && (
            <div className="absolute right-2 top-full mt-2 bg-white border p-2 z-10">
              <input
                type="date"
                onChange={(e)=>{
                  const d = new Date(e.target.value);
                  setSelectedDate(d.toLocaleDateString("fr-FR"));
                  setShowDatePicker(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Identifiant */}
        <div className="border rounded-md px-2 py-2 flex justify-between bg-white">
          <span className="text-[11px] font-semibold text-gray-500">Identifiant</span>
          <span className="text-xs">{customIdentification}</span>
        </div>

        {/* Salle */}
        <div className="border rounded-md px-2 py-2 flex justify-between bg-white">
          <span className="text-[11px] font-semibold text-gray-500">Salle</span>
          <span className="text-xs">{selectedCabinet.room}</span>
        </div>

        {/* S/N */}
        <div className="border rounded-md px-2 py-2 flex justify-between bg-white">
          <span className="text-[11px] font-semibold text-gray-500">S/N</span>
          <span className="text-xs">{selectedCabinet.reference}</span>
        </div>

      </div>

      {/* Tableau */}
      <table className="w-full mb-3 border-collapse shadow-sm">

        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left border">Evaluation état</th>
            <th className="p-2 w-44 border text-center">Conformité</th>
          </tr>
        </thead>

        <tbody>

          {/* Fonctionnel */}
          <tr>
            <td colSpan={2} className="border">
              <div className="flex">
                <div className="w-32 p-2 bg-blue-50 border-r font-bold">Fonctionnel</div>

                <div className="flex-1">
                  {functionalItems.map(item => (
                    <div key={item.key} className="flex border-b">
                      <div className="flex-1 p-2 flex justify-between">

                        <span>{item.label}</span>

                        {item.key === 'extracteur' && SHOW_EXTRACTEUR_DEBIT_INFO && (
                          <div className="flex gap-2 text-xs">
                            <span>Débit:</span>
                            <input
                              type="number"
                              value={debitValue}
                              onChange={(e)=>setDebitValue(e.target.value)}
                              className="w-16 border text-center"
                            />
                            <select
                              value={debitUnit}
                              onChange={(e)=>setDebitUnit(e.target.value)}
                            >
                              <option>m³/h</option>
                              <option>m/s</option>
                            </select>
                          </div>
                        )}

                      </div>

                      <div className="w-44 flex justify-center items-center border-l">
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
            <td colSpan={2} className="border">
              <div className="flex">
                <div className="w-32 p-2 bg-blue-50 border-r font-bold">Structurel</div>
                <div className="flex-1">
                  {structuralItems.map(item => (
                    <div key={item.key} className="flex border-b">
                      <div className="flex-1 p-2">{item.label}</div>
                      <div className="w-44 flex justify-center items-center border-l">
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
            <td colSpan={2} className="border">
              <div className="flex">
                <div className="w-32 p-2 bg-blue-50 border-r font-bold">
                  Principe de sécurité
                </div>

                <div className="flex-1 flex">
                  <div className="flex-1 p-2 flex justify-between">

                    <span>Mise en dépression</span>

                    {SHOW_PSI_FIELD && (
                      <div className="flex gap-2 text-xs">
                        <span>PSI:</span>
                        <input
                          type="number"
                          step="0.01"
                          value={psiValue}
                          onChange={(e)=>setPsiValue(e.target.value)}
                          className="w-16 border text-center"
                        />
                      </div>
                    )}

                  </div>

                  <div className="w-44 flex justify-center items-center border-l">
                    {getStatusDisplay(inspectionStatus['depression'])}
                  </div>

                </div>
              </div>
            </td>
          </tr>

        </tbody>
      </table>

      {/* Remarque */}
      <textarea
        value={remarks}
        onChange={(e)=>setRemarks(e.target.value)}
        className="w-full h-40 border p-2"
      />

      {/* Photo */}
      <input type="file" accept="image/*" onChange={handleImageUpload}/>
      <button onClick={handleCameraCapture}>Photo</button>

    </div>
  );
}
