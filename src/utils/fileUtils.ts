import fs from 'fs';
import path from 'path';
import type { Cabinet } from '../data/cabinets';

export const saveEquipmentToFile = (equipment: Cabinet) => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'cabinets.ts');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Extraire le tableau existant
    const startIndex = fileContent.indexOf('export const cabinets: Cabinet[] = [');
    const endIndex = fileContent.lastIndexOf('];');
    
    if (startIndex === -1 || endIndex === -1) {
      throw new Error('Format de fichier invalide');
    }
    
    // Convertir l'équipement en chaîne formatée
    const equipmentString = `  {
    establishment: "${equipment.establishment}",
    identification: "${equipment.identification}",
    room: "${equipment.room}",
    reference: "${equipment.reference}",
    type: "${equipment.type}"${equipment.type === 'Sorbonne' ? `,
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: ${equipment.airVelocityThresholds?.warning || 0.40}
    }` : ''}
  },`;
    
    // Insérer le nouvel équipement
    const newContent = 
      fileContent.slice(0, endIndex) + 
      '\n' + equipmentString + 
      '\n' + 
      fileContent.slice(endIndex);
    
    fs.writeFileSync(filePath, newContent, 'utf-8');
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    return false;
  }
};