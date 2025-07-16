import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Star, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, Zap, Award, CheckCircle } from 'lucide-react';

const Details = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('red');
  const [selectedSize, setSelectedSize] = useState('M');
  const [isLiked, setIsLiked] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Sample product data - in real app this would come from props or API
  const product = {
    id: 1,
    name: "Classic Singlets",
    brand: "CHRISRON WEARS",
    price: 12000,
    originalPrice: 15000,
    rating: 4.5,
    reviews: 128,
    description: "Elegant and stylish accessory for any occasion. Made with premium quality materials for maximum comfort and durability. Perfect for everyday wear or special occasions.",
    features: [
      "Premium cotton blend fabric for ultimate comfort",
      "Breathable and moisture-wicking technology",
      "Machine washable for easy care",
      "Pre-shrunk for perfect fit that lasts",
      "Available in multiple vibrant colors",
      "Tagless design for irritation-free wear"
    ],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=600&h=700&fit=crop&auto=format"
    ],
    colors: [
      { name: 'red', color: 'bg-gradient-to-br from-red-400 to-red-600', label: 'Crimson Red' },
      { name: 'blue', color: 'bg-gradient-to-br from-blue-400 to-blue-600', label: 'Ocean Blue' },
      { name: 'yellow', color: 'bg-gradient-to-br from-yellow-400 to-yellow-600', label: 'Sunburst Yellow' },
      { name: 'gray', color: 'bg-gradient-to-br from-gray-400 to-gray-600', label: 'Storm Gray' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 15
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [product.images.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsAddingToCart(false);
    setShowSuccessMessage(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  const calculateDiscount = () => {
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 transition-colors duration-300 ${
          index < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : index < rating 
            ? 'fill-yellow-400/50 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const selectedColorInfo = product.colors.find(color => color.name === selectedColor);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-in slide-in-from-right duration-300">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Added to cart successfully!</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
              <div 
                className="relative h-96 sm:h-[500px] lg:h-[650px] group"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={product.images[currentImageIndex]}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Desktop Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:block hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:block hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>

                {/* Like Button */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute top-6 right-6 bg-white/90 hover:bg-white rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110"
                >
                  <Heart className={`w-6 h-6 transition-all duration-300 ${isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-700'}`} />
                </button>

                {/* Discount Badge */}
                <div className="absolute top-6 left-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  -{calculateDiscount()}%
                </div>

                {/* Image Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
                    index === currentImageIndex ? 'ring-4 ring-blue-500 ring-offset-2 scale-105' : 'hover:scale-105'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-20 sm:h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <p className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{product.brand}</p>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">Premium Quality</span>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-600 ml-2 font-medium">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{product.stockCount} in stock</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-8">
                <span className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-2 rounded-full">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </div>
            </div>

            <div className="space-y-8">
              {/* Color Selection */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Color: {selectedColorInfo?.label}</h3>
                <div className="flex items-center space-x-4">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-12 h-12 rounded-full ${color.color} transition-all duration-300 ${
                        selectedColor === color.name ? 'ring-4 ring-offset-2 ring-gray-900 scale-110' : 'hover:scale-110 shadow-lg'
                      }`}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Size: {selectedSize}</h3>
                <div className="grid grid-cols-6 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 text-sm font-bold rounded-xl border-2 transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-gray-900 text-white border-gray-900 scale-105'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:scale-105 shadow-sm'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quantity</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      className="p-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:scale-105 disabled:opacity-50"
                      disabled={quantity === 1}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-16 text-center font-bold text-xl">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="p-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:scale-105"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button 
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="flex-1 bg-gradient-to-r from-gray-900 to-gray-700 text-white py-4 px-8 rounded-2xl font-bold hover:from-gray-800 hover:to-gray-600 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50"
                  >
                    {isAddingToCart ? (
                      <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <ShoppingCart className="w-6 h-6" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                  <button className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-2xl font-bold hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="border-t-2 border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-xl shadow-sm">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="border-t-2 border-gray-200 pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Free Delivery</p>
                    <p className="text-sm text-gray-600">Orders over ₦10,000</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Secure Payment</p>
                    <p className="text-sm text-gray-600">100% Protected</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-xl">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <RotateCcw className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">30 days return</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t-2 border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;