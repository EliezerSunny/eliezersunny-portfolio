import React, { useState, useRef, useCallback } from 'react';
import { Upload, Download, RotateCcw, Maximize2, Zap, Lock, Unlock, Camera } from 'lucide-react';

const ImageResize = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(null);
  const [newWidth, setNewWidth] = useState(800);
  const [newHeight, setNewHeight] = useState(600);
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
  const [originalAspectRatio, setOriginalAspectRatio] = useState(null);
  const [quality, setQuality] = useState(0.9);
  const [format, setFormat] = useState('image/png');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      setOriginalSize({ width: img.width, height: img.height });
      setOriginalAspectRatio(aspectRatio);
      setOriginalImage(img);
      setNewWidth(img.width);
      setNewHeight(img.height);
      setResizedImage(null);
    };
    img.src = URL.createObjectURL(file);
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleWidthChange = (width) => {
    setNewWidth(width);
    if (aspectRatioLocked && originalAspectRatio) {
      setNewHeight(Math.round(width / originalAspectRatio));
    }
  };

  const handleHeightChange = (height) => {
    setNewHeight(height);
    if (aspectRatioLocked && originalAspectRatio) {
      setNewWidth(Math.round(height * originalAspectRatio));
    }
  };

  const handleResize = async () => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    
    // Small delay to show processing state
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = newWidth;
    canvas.height = newHeight;
    
    // Enable image smoothing for better quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    ctx.clearRect(0, 0, newWidth, newHeight);
    ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
    
    const dataUrl = canvas.toDataURL(format, quality);
    setResizedImage(dataUrl);
    setIsProcessing(false);
  };

  const resetToOriginal = () => {
    if (originalSize) {
      setNewWidth(originalSize.width);
      setNewHeight(originalSize.height);
      setResizedImage(null);
    }
  };

  const presetSizes = [
    { label: 'Instagram Square', width: 1080, height: 1080 },
    { label: 'Instagram Portrait', width: 1080, height: 1350 },
    { label: 'Facebook Cover', width: 1200, height: 630 },
    { label: 'Twitter Header', width: 1500, height: 500 },
    { label: 'YouTube Thumbnail', width: 1280, height: 720 },
    { label: 'HD', width: 1920, height: 1080 },
  ];

  const applyPreset = (preset) => {
    setNewWidth(preset.width);
    setNewHeight(preset.height);
    setAspectRatioLocked(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Camera size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Image Resizer Pro</h1>
                <p className="text-purple-100">Professional image resizing with advanced features</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Upload Section */}
            <div className="mb-8">
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Drag and drop your image here
                </p>
                <p className="text-gray-500 mb-4">or</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Choose File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            {originalImage && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Maximize2 size={20} />
                      Resize Settings
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Original: {originalSize.width} × {originalSize.height}</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Width (px)
                          </label>
                          <input
                            type="number"
                            value={newWidth}
                            onChange={(e) => handleWidthChange(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            min="1"
                          />
                        </div>
                        
                        <button
                          onClick={() => setAspectRatioLocked(!aspectRatioLocked)}
                          className={`mt-6 p-2 rounded-lg transition-colors ${
                            aspectRatioLocked
                              ? 'bg-purple-100 text-purple-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                          title={aspectRatioLocked ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
                        >
                          {aspectRatioLocked ? <Lock size={20} /> : <Unlock size={20} />}
                        </button>
                        
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Height (px)
                          </label>
                          <input
                            type="number"
                            value={newHeight}
                            onChange={(e) => handleHeightChange(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            min="1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preset Sizes */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Presets</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {presetSizes.map((preset) => (
                        <button
                          key={preset.label}
                          onClick={() => applyPreset(preset)}
                          className="text-left p-3 bg-white rounded-lg hover:bg-purple-50 hover:border-purple-200 border transition-colors"
                        >
                          <div className="font-medium text-sm">{preset.label}</div>
                          <div className="text-xs text-gray-500">
                            {preset.width} × {preset.height}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Export Settings */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Export Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Format
                        </label>
                        <select
                          value={format}
                          onChange={(e) => setFormat(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                          <option value="image/png">PNG</option>
                          <option value="image/jpeg">JPEG</option>
                          <option value="image/webp">WebP</option>
                        </select>
                      </div>
                      
                      {format === 'image/jpeg' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quality: {Math.round(quality * 100)}%
                          </label>
                          <input
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.1"
                            value={quality}
                            onChange={(e) => setQuality(Number(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleResize}
                      disabled={isProcessing}
                      className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap size={20} />
                          Resize Image
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={resetToOriginal}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                    >
                      <RotateCcw size={20} />
                      Reset
                    </button>
                  </div>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Original Image</h3>
                    <div className="bg-white rounded-lg p-4 border">
                      <img
                        src={originalImage.src}
                        alt="Original"
                        className="max-w-full h-auto rounded-lg shadow-sm"
                        style={{ maxHeight: '300px' }}
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        Size: {originalSize.width} × {originalSize.height}
                      </p>
                    </div>
                  </div>

                  {resizedImage && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Resized Image</h3>
                      <div className="bg-white rounded-lg p-4 border">
                        <img
                          src={resizedImage}
                          alt="Resized"
                          className="max-w-full h-auto rounded-lg shadow-sm"
                          style={{ maxHeight: '300px' }}
                        />
                        <p className="text-sm text-gray-600 mt-2">
                          Size: {newWidth} × {newHeight}
                        </p>
                        <a
                          href={resizedImage}
                          download="resized-image"
                          className="mt-3 inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          <Download size={16} />
                          Download Image
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ImageResize;