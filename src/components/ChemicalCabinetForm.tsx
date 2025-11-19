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
      <div className="flex justify-center items-center mb-6 border-b pb-4">
        <div className="flex flex-col items-center">
          <img
             src={logo}
            alt="Logo"
            className="h-24 object-contain mb-1"
          />
          <div className="text-sm text-gray-600 font-medium">Pole Expertise</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-lg mb-6 font-bold text-xl tracking-wide shadow-sm">
        ARMOIRE CHIMIQUE
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center py-2 rounded-lg mb-6 font-medium tracking-wide shadow-sm">
        {selectedCabinet.establishment}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border rounded-lg p-4 flex items-center bg-gray-50 shadow-sm">
          <span className="text-sm font-bold min-w-24 text-gray-700">Date:</span>
          <div className="flex-1 flex items-center gap-2">
            <span className="text-sm px-2">{selectedDate}</span>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="p-1 hover:bg-gray-200 rounded-md transition-colors print:hidden pdf-hide"
            >
              <Calendar size={18} className="text-gray-600" />
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
        <div className="border rounded-lg p-4 flex items-center bg-gray-50 shadow-sm">
          <span className="text-sm font-bold min-w-24 text-gray-700">Identifiant:</span>
          <span className="text-sm flex-1 px-2">{selectedCabinet.identification}</span>
        </div>
        <div className="border rounded-lg p-4 flex items-center bg-gray-50 shadow-sm">
          <span className="text-sm font-bold min-w-24 text-gray-700">Salle:</span>
          <span className="text-sm flex-1 px-2">{selectedCabinet.room}</span>
        </div>
        <div className="border rounded-lg p-4 flex items-center bg-gray-50 shadow-sm">
          <span className="text-sm font-bold min-w-24 text-gray-700">S/N:</span>
          <span className="text-sm flex-1 px-2">{selectedCabinet.reference}</span>
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="font-bold mb-1 text-gray-700 text-xs">Remarque:</div>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full h-48 border border-gray-300 rounded-lg p-2 text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            style={{ borderStyle: 'dashed' }}
          />

          <div className="mt-4">
            <div className="font-bold mb-2 text-gray-700 text-xs">Identification et VISA Contrôleur:</div>
            <div className="w-full h-28 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <img
                src={sig1}
                alt="Signature Contrôleur"
                className="max-h-full object-contain p-3"
              />
            </div>
          </div>
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
            className="photo-container w-full border border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 text-xs bg-white cursor-pointer hover:bg-gray-50 transition-all focus:ring-2 focus:ring-blue-500 relative"
            style={{ borderStyle: 'dashed', height: '320px' }}
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
    </div>
  );
}
