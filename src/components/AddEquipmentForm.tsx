import React, { useState } from 'react';
import { X, Download, Copy, ClipboardCheck } from 'lucide-react';
import type { Cabinet } from '../data/cabinets';

interface AddEquipmentFormProps {
  onClose: () => void;
  onAdd: (newEquipment: Cabinet) => void;
  onExport: () => void;
}

export function AddEquipmentForm({ onClose, onAdd, onExport }: AddEquipmentFormProps) {
  const establishments = ["ESIROI", "Campus du Tampon", "IUT", "Fac Moufia", "PTU StDenis"];
  const types = ["Armoire Chimique", "Hotte / PSM", "Sorbonne"];
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showCopyFormat, setShowCopyFormat] = useState(false);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<Cabinet>({
    establishment: establishments[0],
    type: types[0],
    identification: '',
    room: '',
    reference: '',
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.40
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.identification || !formData.room || !formData.reference) {
      setSaveError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      onAdd(formData);
      onClose();
    } catch (error) {
      setSaveError('Erreur lors de la sauvegarde. Veuillez réessayer.');
    }
  };

  const getFormattedData = () => {
    const data = {
      ...formData,
      airVelocityThresholds: formData.type === 'Sorbonne' ? {
        min: 0.40,
        max: 0.60,
        warning: formData.airVelocityThresholds?.warning || 0.40
      } : undefined
    };

    return JSON.stringify(data, null, 2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFormattedData());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full mx-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Ajouter un équipement</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCopyFormat(!showCopyFormat)}
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-full transition-colors"
            title="Afficher le format de copie"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            onClick={onExport}
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-full transition-colors"
            title="Exporter la liste des équipements"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {showCopyFormat && (
        <div className="mb-6 relative">
          <div className="absolute right-2 top-2">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Copier le format"
            >
              {copied ? (
                <ClipboardCheck className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
          <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
            {getFormattedData()}
          </pre>
        </div>
      )}

      {saveError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {saveError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Établissement
          </label>
          <select
            value={formData.establishment}
            onChange={(e) => setFormData({ ...formData, establishment: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {establishments.map((establishment) => (
              <option key={establishment} value={establishment}>
                {establishment}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type d'équipement
          </label>
          <select
            value={formData.type}
            onChange={(e) => {
              const newType = e.target.value;
              setFormData({
                ...formData,
                type: newType,
                airVelocityThresholds: newType === 'Sorbonne' ? {
                  min: 0.40,
                  max: 0.60,
                  warning: 0.40
                } : undefined
              });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Identifiant
          </label>
          <input
            type="text"
            value={formData.identification}
            onChange={(e) => setFormData({ ...formData, identification: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: A, B, S01..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salle
          </label>
          <input
            type="text"
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: A120"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de série
          </label>
          <input
            type="text"
            value={formData.reference}
            onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: MAPS 8545 07"
          />
        </div>

        {formData.type === 'Sorbonne' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seuil d'acceptabilité
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.airVelocityThresholds?.warning || 0.40}
              onChange={(e) => setFormData({
                ...formData,
                airVelocityThresholds: {
                  min: 0.40,
                  max: 0.60,
                  warning: parseFloat(e.target.value)
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}