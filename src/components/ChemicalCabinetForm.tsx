import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, AlertTriangle, XCircle, Camera } from 'lucide-react';
import type { Cabinet } from '../data/cabinets';

import logo from "../assets/images/logo.png";
import sig1 from "../assets/images/sig1.png";
import sig2 from "../assets/images/sig2.png";

/** ✅ Variables de contrôle affichage */
const SHOW_EXTRACTEUR_DEBIT_INFO = false;
const SHOW_PSI_FIELD = true;

/** ✅ Valeur par défaut PSI */
const DEFAULT_PSI_VALUE = "-1.0";

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

      {/* --- Tout le reste du code est inchangé --- */}

      {/* Sécurité */}
      <tr>
        <td className="border" colSpan={2}>
          <div className="flex">
            <div className="w-32 p-2 bg-blue-50 border-r">
              <div className="font-bold text-blue-800 text-sm">
                Principe de sécurité
              </div>
            </div>

            <div className="flex-1">
              <div className="flex">
                <div className="flex-1 p-2 pl-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm">
                      Mise en dépression de l'enceinte
                    </span>

                    {/* ✅ PSI conditionnel */}
                    {SHOW_PSI_FIELD && (
                      <div className="flex items-center gap-2 text-[11px] text-gray-600">
                        <span className="font-medium">PSI:</span>
                        <input
                          type="number"
                          step="0.01"
                          value={psiValue}
                          onChange={(e) => setPsiValue(e.target.value)}
                          className="w-16 px-2 py-1 border rounded text-center text-[11px]"
                          placeholder="-1.0"
                        />
                      </div>
                    )}
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

    </div>
  );
}
