import React from 'react';
import { Calendar, CheckCircle2, AlertTriangle, XCircle, Camera } from 'lucide-react';
import type { Cabinet } from '../data/cabinets';

import logo from "../assets/images/logo.png";
import sig1 from "../assets/images/sig1.png";
import sig2 from "../assets/images/sig2.png";

interface ChemicalCabinetFormProps {
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

export function ChemicalCabinetForm({
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
}: ChemicalCabinetFormProps) {
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
      <div className="flex justify-center items-center mb-4 sm:mb-6 border-b pb-3 sm:pb-4">
        <div className="flex flex-col items-center">
          <img
             src={logo}
            alt="Logo"
            className="h-16 sm:h-20 md:h-24 object-contain mb-1"
          />
          <div className="text-xs sm:text-sm text-gray-600 font-medium">Pole Expertise</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-2 sm:py-3 rounded-lg mb-3 sm:mb-6 font-bold text-lg sm:text-xl tracking-wide shadow-sm">
        ARMOIRE CHIMIQUE
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center py-1.5 sm:py-2 rounded-lg mb-3 sm:mb-6 font-medium text-sm sm:text-base tracking-wide shadow-sm">
        {selectedCabinet.establishment}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="border rounded-lg p-2 sm:p-3 md:p-4 flex items-center bg-gray-50 shadow-sm">
          <span className="text-xs sm:text-sm font-bold min-w-16 sm:min-w-24 text-gray-700">Date:</span>
          <div className="flex-1 flex items-center gap-2">
            <span className="text-xs sm:text-sm px-2">{selectedDate}</span>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="p-1 hover:bg-gray-200 rounded-md transition-colors print:hidden pdf-hide"
            >
              <Calendar size={16} className="text-gray-600 sm:w-[18px] sm:h-[18px]" />
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
                  className="p-2 border rounded-md text-sm"
                />
              </div>
            )}
          </div>
        </div>
        <div className="border rounded-lg p-2 sm:p-3 md:p-4 flex items-center bg-gray-50 shadow-sm">
          <span className="text-xs sm:text-sm font-bold min-w-16 sm:min-w-24 text-gray-700">Identifiant:</span>
          <span className="text-xs sm:text-sm flex-1 px-2">{selectedCabinet.identification}</span>
        </div>
        <div className="border rounded-lg p-2 sm:p-3 md:p-4 flex items-center bg-gray-50 shadow-sm">
          <span className="text-xs sm:text-sm font-bold min-w-16 sm:min-w-24 text-gray-700">Salle:</span>
          <span className="text-xs sm:text-sm flex-1 px-2">{selectedCabinet.room}</span>
        </div>
        <div className="border rounded-lg p-2 sm:p-3 md:p-4 flex items-center bg-gray-50 shadow-sm">
          <span className="text-xs sm:text-sm font-bold min-w-16 sm:min-w-24 text-gray-700">S/N:</span>
          <span className="text-xs sm:text-sm flex-1 px-2">{selectedCabinet.reference}</span>
        </div>
      </div>

      <div className="overflow-x-auto mb-4 sm:mb-6">
      <table className="w-full border-collapse shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 sm:p-3 text-left font-bold text-gray-700 border text-xs sm:text-sm">Evaluation état de l'appareillage</th>
            <th className="p-2 sm:p-3 w-24 sm:w-32 font-bold text-gray-700 border text-center text-xs sm:text-sm">Conformité</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border" colSpan={2}>
              <div className="flex">
                <div className="w-24 sm:w-32 p-2 sm:p-3 bg-blue-50 border-r">
                  <div className="font-bold text-blue-800 text-xs sm:text-sm">Fonctionnel</div>
                </div>
                <div className="flex-1">
                  {functionalItems.map((item) => (
                    <div key={item.key} className="flex border-b last:border-b-0">
                      <div className="flex-1 p-2 sm:p-3 pl-4 sm:pl-6 text-xs sm:text-sm">{item.label}</div>
                      <div className="w-24 sm:w-32 p-2 sm:p-3 border-l flex justify-center">
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
                <div className="w-24 sm:w-32 p-2 sm:p-3 bg-blue-50 border-r">
                  <div className="font-bold text-blue-800 text-xs sm:text-sm">Structurel</div>
                </div>
                <div className="flex-1">
                  {structuralItems.map((item) => (
                    <div key={item.key} className="flex border-b last:border-b-0">
                      <div className="flex-1 p-2 sm:p-3 pl-4 sm:pl-6 text-xs sm:text-sm">{item.label}</div>
                      <div className="w-24 sm:w-32 p-2 sm:p-3 border-l flex justify-center">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <div className="font-bold mb-1 text-gray-700 text-xs sm:text-sm">Remarque:</div>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full h-40 sm:h-48 border border-gray-300 rounded-lg p-2 text-xs sm:text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            style={{ borderStyle: 'dashed' }}
          />
        </div>
        <div>
          <div className="font-bold mb-1 text-gray-700 text-xs sm:text-sm flex items-center justify-between">
            <span>Photo:</span>
            <button
              onClick={handleCameraCapture}
              className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-[10px] sm:text-xs hover:bg-blue-700 transition-colors print:hidden pdf-hide"
              type="button"
            >
              <Camera size={12} className="sm:w-[14px] sm:h-[14px]" />
              <span className="hidden sm:inline">Prendre photo</span>
              <span className="sm:hidden">Photo</span>
            </button>
          </div>
          <label
            className="photo-container w-full h-40 sm:h-48 border border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 text-xs bg-white cursor-pointer hover:bg-gray-50 transition-all focus:ring-2 focus:ring-blue-500 relative"
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
                <p className="font-medium">Drop photo here</p>
                <p className="text-xs mt-1 text-gray-500">or click to select</p>
              </div>
            )}
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mt-4 sm:mt-6">
        <div>
          <div className="font-bold mb-1 sm:mb-2 text-gray-700 text-xs sm:text-sm">Identification et VISA Contrôleur:</div>
          <div className="w-full h-24 sm:h-28 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
            <img
              src={sig1}
              alt="Signature Contrôleur"
              className="max-h-full object-contain p-2 sm:p-3"
            />
          </div>
        </div>
        <div>
          <div className="font-bold mb-1 sm:mb-2 text-gray-700 text-xs sm:text-sm">Identification et VISA Maintenance:</div>
          <div className="w-full h-24 sm:h-28 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
            <img
              src={sig2}
              alt="Signature Maintenance"
              className="max-h-full object-contain p-2 sm:p-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
