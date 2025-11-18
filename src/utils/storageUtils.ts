import type { Cabinet } from '../data/cabinets';

const STORAGE_KEY = 'equipment_list';
const VERSION_KEY = 'equipment_list_version';
const CURRENT_VERSION = '1.0';

// Load equipment list with version check
export const loadEquipmentList = (): Cabinet[] => {
  try {
    const version = localStorage.getItem(VERSION_KEY);
    const stored = localStorage.getItem(STORAGE_KEY);
    
    // If version doesn't match, clear storage
    if (version !== CURRENT_VERSION) {
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erreur lors du chargement:', error);
    return [];
  }
};

// Save equipment list with validation
export const saveEquipmentList = (list: Cabinet[]): boolean => {
  try {
    // Validate data before saving
    if (!Array.isArray(list)) {
      throw new Error('Invalid data format');
    }
    
    // Validate each equipment
    list.forEach(equipment => {
      if (!equipment.establishment || !equipment.identification || !equipment.room || !equipment.type) {
        throw new Error('Missing required fields');
      }
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    return false;
  }
};

// Export equipment list as TypeScript file
export const exportEquipmentAsCabinetsTS = (equipmentList: Cabinet[]): string => {
  const formatEquipment = (equipment: Cabinet): string => {
    const base = `  {
    establishment: "${equipment.establishment}",
    identification: "${equipment.identification}",
    room: "${equipment.room}",
    reference: "${equipment.reference}",
    type: "${equipment.type}"`;

    const thresholds = equipment.type === 'Sorbonne' ? `,
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: ${equipment.airVelocityThresholds?.warning || 0.40}
    }` : '';

    return base + thresholds + '\n  }';
  };

  const equipmentStrings = equipmentList.map(formatEquipment).join(',\n');

  return `export interface Cabinet {
  establishment: string;
  identification: string;
  room: string;
  reference: string;
  type: string;
  airVelocityThresholds?: {
    min: number;
    max: number;
    warning?: number;
  };
}

export const cabinets: Cabinet[] = [
${equipmentStrings}
];`;
};

// Clear all stored data
export const clearStoredData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(VERSION_KEY);
};

// Get storage status
export const getStorageStatus = (): { used: number; total: number } => {
  const used = new Blob([localStorage.getItem(STORAGE_KEY) || '']).size;
  const total = 5 * 1024 * 1024; // 5MB typical localStorage limit
  return { used, total };
};