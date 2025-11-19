import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { FileDown, Calendar, ChevronDown, Plus, AlertTriangle } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { cabinets, type Cabinet } from './data/cabinets';
import { ChemicalCabinetForm } from './components/ChemicalCabinetForm';
import { SorbonneForm } from './components/SorbonneForm';
import { HotteForm } from './components/HotteForm';
import { QuickRemarks } from './components/QuickRemarks';
import { LoginPage } from './components/LoginPage';
import { AddEquipmentForm } from './components/AddEquipmentForm';
import { loadEquipmentList, saveEquipmentList, exportEquipmentAsCabinetsTS, getStorageStatus } from './utils/storageUtils';

export default function App() {
  const formattedDate = new Date().toLocaleDateString('fr-FR').slice(0, 8);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [selectedDate, setSelectedDate] = useState('11/12/24');
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [showCabinetSelector, setShowCabinetSelector] = useState(false);
  const [selectedCabinet, setSelectedCabinet] = useState<Cabinet>(cabinets[0]);
  const [selectedEstablishment, setSelectedEstablishment] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [showAddEquipmentForm, setShowAddEquipmentForm] = useState(false);
  const [equipmentList, setEquipmentList] = useState<Cabinet[]>([]);
  const [storageWarning, setStorageWarning] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  const [showCropModal, setShowCropModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [logoBase64, setLogoBase64] = useState<string>('');
  const [sig1Base64, setSig1Base64] = useState<string>('');
  const [sig2Base64, setSig2Base64] = useState<string>('');
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [inspectionStatus, setInspectionStatus] = useState({
    extracteur: 'conforme',
    filtre: 'conforme',
    etageres: 'conforme',
    portes: 'conforme',
    interieur: 'conforme',
    exterieur: 'conforme',
    etancheite: 'conforme',
    ventilateur: 'conforme',
    guillotine: 'conforme',
    eclairage: 'conforme',
    alarme: 'conforme',
    vitre: 'conforme',
    parois: 'conforme',
    etancheite_extraction: 'conforme',
    proprete_extraction: 'conforme',
    test_fumigene: '',
    vitesse_air: ''
  });

  useEffect(() => {
    const storedList = loadEquipmentList();
    const allEquipment = [...cabinets, ...storedList];
    setEquipmentList(allEquipment);
    
    const { used, total } = getStorageStatus();
    if (used > total * 0.8) {
      setStorageWarning(`Attention: L'espace de stockage est presque plein (${Math.round(used/total*100)}%)`);
    }
  }, []);

  const establishments = useMemo(() => 
    Array.from(new Set(equipmentList.map(cabinet => cabinet.establishment))).sort(),
    [equipmentList]
  );

  const deviceTypes = useMemo(() => 
    Array.from(new Set(equipmentList.map(cabinet => cabinet.type))).sort(),
    [equipmentList]
  );

  const filteredCabinets = useMemo(() => 
    equipmentList.filter(cabinet => {
      const matchEstablishment = !selectedEstablishment || cabinet.establishment === selectedEstablishment;
      const matchType = !selectedType || cabinet.type === selectedType;
      return matchEstablishment && matchType;
    }),
    [selectedEstablishment, selectedType, equipmentList]
  );

  const handleStatusChange = (item: string, value: string) => {
    setInspectionStatus(prev => ({
      ...prev,
      [item]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setShowCropModal(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = useCallback((image: HTMLImageElement) => {
    imageRef.current = image;
  }, []);

  const getCroppedImg = useCallback(() => {
    if (!imageRef.current || !crop.width || !crop.height) return;

    const canvas = document.createElement('canvas');
    const image = imageRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL('image/jpeg', 0.95);
  }, [crop]);

  const handleCropComplete = () => {
    const croppedImageUrl = getCroppedImg();
    if (croppedImageUrl) {
      setCroppedImage(croppedImageUrl);
      setShowCropModal(false);
      setUploadedImage(null);
    }
  };

  const convertImageToBase64 = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = url;
    });
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        const [logo, sig1, sig2] = await Promise.all([
          convertImageToBase64('/logoPng/logo.png'),
          convertImageToBase64('/logoPng/sig1.png'),
          convertImageToBase64('/logoPng/sig2.png')
        ]);
        setLogoBase64(logo);
        setSig1Base64(sig1);
        setSig2Base64(sig2);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Erreur lors du chargement des images:', error);
      }
    };
    loadImages();
  }, []);

  const handleAddEquipment = (newEquipment: Cabinet) => {
    const updatedList = [...equipmentList, newEquipment];
    setEquipmentList(updatedList);
    
    const newEquipments = updatedList.filter(
      equipment => !cabinets.some(
        cabinet => 
          cabinet.establishment === equipment.establishment &&
          cabinet.identification === equipment.identification &&
          cabinet.room === equipment.room
      )
    );
    
    const saved = saveEquipmentList(newEquipments);
    if (!saved) {
      console.error('Erreur lors de la sauvegarde dans le localStorage');
      alert('Erreur lors de la sauvegarde. Vérifiez l\'espace de stockage disponible.');
      return;
    }

    const { used, total } = getStorageStatus();
    if (used > total * 0.8) {
      setStorageWarning(`Attention: L'espace de stockage est presque plein (${Math.round(used/total*100)}%)`);
    }
    
    setShowAddEquipmentForm(false);
  };

  const handleExportEquipment = () => {
    const content = exportEquipmentAsCabinetsTS(equipmentList);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cabinets.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCabinetChange = (cabinet: Cabinet) => {
    setSelectedCabinet(cabinet);
    setShowCabinetSelector(false);
    setCroppedImage(null);
  };

  const generatePDF = async () => {
    if (!imagesLoaded) {
      alert('Veuillez patienter pendant le chargement des images...');
      //return; -> Off
    }

    const element = document.getElementById('inspection-form');
    if (!element) return;

    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: true,
      imageTimeout: 0,
      scrollY: 0,
      scrollX: 0,
      windowHeight: element.scrollHeight,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById('inspection-form');
        if (clonedElement) {
          clonedElement.style.minHeight = 'auto';
          clonedElement.style.height = 'auto';
        }

        const calendarButtons = clonedDoc.querySelectorAll('.pdf-hide');
        calendarButtons.forEach(button => {
          (button as HTMLElement).style.display = 'none';
        });

        const inputs = clonedDoc.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
          const inputElement = input as HTMLInputElement;
          const value = inputElement.value;
          const div = document.createElement('div');
          div.textContent = value || '0.00';
          div.style.textAlign = 'center';
          div.style.padding = '4px';
          div.style.border = '1px solid #d1d5db';
          div.style.borderRadius = '0.25rem';
          inputElement.parentNode?.replaceChild(div, inputElement);
        });

        const remarksTextarea = clonedDoc.querySelector('textarea');
        if (remarksTextarea) {
          const textareaElement = remarksTextarea as HTMLTextAreaElement;
          const div = document.createElement('div');
          div.style.whiteSpace = 'pre-wrap';
          div.style.wordBreak = 'break-word';
          div.style.width = '100%';
          div.style.minHeight = '192px';
          div.style.padding = '0.5rem';
          div.style.border = '1px dashed #d1d5db';
          div.style.borderRadius = '0.5rem';
          div.style.backgroundColor = '#ffffff';
          div.style.fontSize = '0.875rem';
          div.textContent = textareaElement.value;
          textareaElement.parentNode?.replaceChild(div, textareaElement);
        }

        const photoContainer = clonedDoc.querySelector('.photo-container');
        if (photoContainer) {
          const containerDiv = photoContainer as HTMLElement;

          if (croppedImage) {
            containerDiv.style.display = 'flex';
            containerDiv.style.alignItems = 'center';
            containerDiv.style.justifyContent = 'center';
            containerDiv.style.backgroundColor = '#ffffff';
            containerDiv.style.position = 'relative';
            containerDiv.style.overflow = 'hidden';
            containerDiv.style.border = '1px dashed #d1d5db';
            containerDiv.style.borderRadius = '0.5rem';
            containerDiv.style.height = '320px';

            const img = photoContainer.querySelector('img');
            if (img) {
              const imgElement = img as HTMLImageElement;
              imgElement.src = croppedImage;
              imgElement.style.display = 'block';
              imgElement.style.position = 'relative';
              imgElement.style.maxWidth = '100%';
              imgElement.style.maxHeight = '100%';
              imgElement.style.width = 'auto';
              imgElement.style.height = 'auto';
              imgElement.style.objectFit = 'contain';
              imgElement.style.margin = 'auto';
            }

            const textElements = photoContainer.querySelectorAll('div:not(.w-full.h-full), p, span');
            textElements.forEach(el => {
              const element = el as HTMLElement;
              if (element && !element.querySelector('img')) {
                element.style.display = 'none';
              }
            });
          } else {
            while (containerDiv.firstChild) {
              containerDiv.removeChild(containerDiv.firstChild);
            }
            containerDiv.style.backgroundColor = '#ffffff';
            containerDiv.style.border = '1px dashed #d1d5db';
            containerDiv.style.borderRadius = '0.5rem';
            containerDiv.style.height = '320px';
          }
        }

        const images = clonedDoc.querySelectorAll('img');
        images.forEach(img => {
          if (img.src.includes('logo.png')) {
            img.src = logoBase64;
          } else if (img.src.includes('sig1.png')) {
            img.src = sig1Base64;
          } else if (img.src.includes('sig2.png')) {
            img.src = sig2Base64;
          }
          img.style.maxWidth = '100%';
          img.style.maxHeight = '100%';
          img.style.objectFit = 'contain';
        });
      }
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const sideWidth = 12;

    pdf.setFillColor(0, 150, 214);
    pdf.rect(0, 0, sideWidth, pdfHeight, 'F');

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const marginLeft = 14;
    const marginTop = 5;
    const marginBottom = 5;
    const availableWidth = pdfWidth - sideWidth - marginLeft - 2;
    const availableHeight = pdfHeight - marginTop - marginBottom;

    const ratio = Math.min(
      availableWidth / imgWidth,
      availableHeight / imgHeight
    );

    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;

    const x = sideWidth + marginLeft;
    const y = marginTop;

    pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);

    const fileName = `${selectedCabinet.type} - ${selectedCabinet.identification} - ${selectedCabinet.establishment} - ${selectedCabinet.room} - ${selectedDate}.pdf`
      .replace(/[/\\?%*:|"<>]/g, '-');

    pdf.save(fileName);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {storageWarning && (
        <div className="max-w-[1000px] mx-auto mb-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2 text-amber-700">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm">{storageWarning}</span>
          </div>
        </div>
      )}

      <div className="max-w-[1000px] mx-auto mb-4">
        <div className="bg-white rounded-lg shadow p-3">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Établissement
              </label>
              <select
                value={selectedEstablishment}
                onChange={(e) => {
                  setSelectedEstablishment(e.target.value);
                  const newCabinet = filteredCabinets[0] || cabinets[0];
                  handleCabinetChange(newCabinet);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous les établissements</option>
                {establishments.map((establishment) => (
                  <option key={establishment} value={establishment}>
                    {establishment}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Type d'appareil
              </label>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  const newCabinet = filteredCabinets[0] || cabinets[0];
                  handleCabinetChange(newCabinet);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous les types</option>
                {deviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-700">Sélectionner un équipement:</span>
            <div className="flex-1 relative">
              <button
                onClick={() => setShowCabinetSelector(!showCabinetSelector)}
                className="w-full flex items-center justify-between gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border"
              >
                <span className="text-sm">
                  {`${selectedCabinet.establishment} - ${selectedCabinet.room} - ${selectedCabinet.type} - ${selectedCabinet.identification}`}
                </span>
                <ChevronDown size={16} className="text-gray-600" />
              </button>
              {showCabinetSelector && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-xl border p-1 z-10 max-h-60 overflow-y-auto">
                  {filteredCabinets.map((cabinet, index) => (
                    <button
                      key={index}
                      onClick={() => handleCabinetChange(cabinet)}
                      className="w-full text-left px-2 py-1.5 hover:bg-gray-100 rounded text-sm transition-colors"
                    >
                      {`${cabinet.establishment} - ${cabinet.room} - ${cabinet.type} - ${cabinet.identification}`}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setShowAddEquipmentForm(true)}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              <span className="text-sm font-medium">Ajouter</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto grid grid-cols-[200px_1fr] gap-4">
        <div>
          <div className="bg-white rounded-lg shadow p-3">
            <QuickRemarks
              deviceType={
                selectedCabinet.type === 'Sorbonne' ? 'sorbonne' :
                selectedCabinet.type === 'PSM' ? 'psm' :
                selectedCabinet.type === 'Hotte' ? 'sorbonne' :
                'armoire'
              }
              currentRemarks={remarks}
              onUpdateRemarks={setRemarks}
              inspectionStatus={inspectionStatus}
              handleStatusChange={handleStatusChange}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6" id="inspection-form" style={{ minHeight: '297mm', width: '210mm' }}>
          {selectedCabinet.type === 'Armoire Chimique' ? (
            <ChemicalCabinetForm
              selectedCabinet={selectedCabinet}
              selectedDate={selectedDate}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
              setSelectedDate={setSelectedDate}
              inspectionStatus={inspectionStatus}
              handleStatusChange={handleStatusChange}
              remarks={remarks}
              setRemarks={setRemarks}
              croppedImage={croppedImage}
              handleImageUpload={handleImageUpload}
            />
          ) : selectedCabinet.type === 'Sorbonne' ? (
            <SorbonneForm
              selectedCabinet={selectedCabinet}
              selectedDate={selectedDate}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
              setSelectedDate={setSelectedDate}
              inspectionStatus={inspectionStatus}
              handleStatusChange={handleStatusChange}
              remarks={remarks}
              setRemarks={setRemarks}
              croppedImage={croppedImage}
              handleImageUpload={handleImageUpload}
            />
          ) : selectedCabinet.type === 'Hotte' ? (
            <HotteForm
              selectedCabinet={selectedCabinet}
              selectedDate={selectedDate}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
              setSelectedDate={setSelectedDate}
              inspectionStatus={inspectionStatus}
              handleStatusChange={handleStatusChange}
              remarks={remarks}
              setRemarks={setRemarks}
              croppedImage={croppedImage}
              handleImageUpload={handleImageUpload}
            />
          ) : selectedCabinet.type === 'PSM' ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              Fiche PSM en cours de développement
            </div>
          ) : null}
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto mt-4 flex justify-end">
        <button
          onClick={generatePDF}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all shadow hover:shadow-lg text-sm"
        >
          <FileDown size={18} />
          Export PDF
        </button>
      </div>

      {showAddEquipmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AddEquipmentForm
            onClose={() => setShowAddEquipmentForm(false)}
            onAdd={handleAddEquipment}
            onExport={handleExportEquipment}
          />
        </div>
      )}

      {showCropModal && uploadedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Recadrer l'image</h3>
            <div className="max-h-[70vh] overflow-auto mb-4">
              <ReactCrop
                crop={crop}
                onChange={c => setCrop(c)}
                className="max-w-full mx-auto"
              >
                <img
                  ref={imageRef}
                  src={uploadedImage}
                  alt="Upload"
                  className="max-w-full rounded-lg"
                  onLoad={(e) => onImageLoad(e.currentTarget)}
                />
              </ReactCrop>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCropModal(false);
                  setUploadedImage(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleCropComplete}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}