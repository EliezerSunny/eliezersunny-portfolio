import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
// import data from '../components/data';
// import Layout from '../components/Layout';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Ban, Heart, Star, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, Zap, Award, CheckCircle, ArrowLeft } from 'lucide-react';


// import { ChevronLeft, ChevronRight, Heart, Star, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, Zap, Award, CheckCircle } from 'lucide-react';

// import { useParams } from 'react-router-dom';

// import { products } from './pages/data';



const Product = () => {


  const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('white');
    const [selectedSize, setSelectedSize] = useState('M');
    const [isLiked, setIsLiked] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    // const [isAddingToCart, setIsAddingToCart] = useState(false);
    // const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
const {
  products,
  addToCart,
  activeCategory,
  setActiveCategory,
  filteredProducts,
  // currentImageIndex,
  // setCurrentImageIndex,
  // nextImage,
  // prevImage,
  StarRating,
  darkMode,
  sortBy,
  setSortBy,
  likes,
  toggleLike,
  LazyImage,
  isAddingToCart,
  setIsAddingToCart,
  categories,
  navigate,
  handleLinkClick,
  loading,
  Loader2,
  visibleProducts,
  visibleCount,
  showSuccessMessage,
  removeSuccessMessage,
  showSuccessMessageLike,
  cartItemCount,
  
  updateQuantity,
} = useOutletContext();



// id



    const {id} = useParams();
    // const navigate = useNavigate();
    const product = products.find(item => item.id === parseInt(id));


    if (!product) 
        return 
        // <div className='p-4 flex items-center'>
        //     Product not found
        // </div>

        <div className="flex items-center py-24">
          <div className="inline-flex items-center space-x-2 bg-gray-100 px-6 py-3 rounded-full">
            <span className="text-gray-600">Product not found!</span>
            <span className="text-2xl">🚫</span>
          </div>
        </div>
        ;


// id end


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

    // Touch handlers for mobile swipe end


  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };


  const calculateDiscount = () => {
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };


  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };


  const selectedColorInfo = product.colors.find(color => color.name === selectedColor);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-18">
      {/* Success Message */}
      {/* {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-in slide-in-from-right duration-300">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Cart Updated Successfully!</span>
        </div>
      )} */}

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
                  onClick={() => toggleLike(product.id)}
                  className={`absolute top-6 right-6 bg-white/90 hover:bg-white rounded-full p-2 shadow-xl transition-all duration-300 ${
                                    likes.includes(product.id) 
                                      ? 'bg-white text-white' 
                                      : 'bg-white text-gray-600 hover:bg-gray-100'
                                  } hover:scale-110`}
                >
                  <Heart className={`w-6 h-6 transition-all duration-300 ${likes.includes(product.id) ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-700'}`} />
                </button>


                {/* Discount Badge */}
                <div className="absolute top-6 left-6 bg-gradient-to-r from-amber-600 to-pink-500 text-white px-2 py-1 rounded-full font-bold shadow-lg">
                  -{calculateDiscount()}%
                </div>

                {/* Image Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50 w-2 hover:bg-white/70'
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
                    index === currentImageIndex ? 'ring-2 ring-amber-500 ring-offset-1 scale-105' : 'hover:scale-105'
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
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <p className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{product.brand}</p>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Premium Quality</span>
                </div>
              </div>
              
              <h1 className={` text-2xl sm:text-2xl font-bold mb-3 leading-tight ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  {/* {renderStars(product.rating)} */}
                  <span className="text-sm text-gray-600 ml-2 font-medium">
                    {/* {product.rating} ({product.reviews} reviews) */}
                    <StarRating rating={product.rating} reviews={product.reviews} />
                  </span>
                </div>

                {product.inStock ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{product.stockCount} in stock</span>
                </div>   
                  ) : (
                                      <div className="flex items-center space-x-1 text-red-400">
                                        <Ban className='w-3 h-3' />
                                        <span className="text-xs font-medium">Out of stock</span>
                                      </div>
                                    )}

              </div>

              <div className="flex items-center space-x-4 mb-4">
                <span className={`text-xl font-bold  ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{formatPrice(product.price)}</span>
                <span className={` text-l line-through ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{formatPrice(product.originalPrice)}</span>
                <span className="bg-gradient-to-r from-amber-600 to-pink-500 text-white text-sm font-bold px-2 py-1.5 rounded-full">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Color Selection */}
              <div>
                <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Color: {selectedColorInfo?.label}</h3>
                <div className="flex items-center space-x-4">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-1 border-gray-600 ${color.color} transition-all duration-300 ${
                        selectedColor === color.name ? 'ring-2 ring-offset-1 ring-amber-600 scale-110' : 'hover:scale-110 shadow-lg'
                      }`}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Size: {selectedSize}</h3>
                <div className="grid grid-cols-6 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-2 mb-6 text-sm font-bold rounded-xl border-1 transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-amber-600 text-white border-gray-300 scale-105'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:scale-105 shadow-sm'
                      } ${darkMode ? 'bg-amber-300 text-gray-300 border-gray-300' : 'bg-amber-300 text-gray-300 border-gray-300'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-6">

                {cartItemCount > 0 ? (
                <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Quantity</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="p-2 rounded-xl border-2 border-gray-300 hover:bg-gray-300 transition-all duration-300 hover:scale-105 disabled:opacity-50"
                      disabled={cartItemCount === 1}
                    >
                      <Minus className="w-5 h-4" />
                    </button>
                    <span className="w-16 text-center font-bold text-xl">{cartItemCount}</span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="p-2 rounded-xl border-2 border-gray-300 hover:bg-gray-300 transition-all duration-300 hover:scale-105"
                    >
                      <Plus className="w-5 h-4" />
                    </button>
                  </div>
                </div>

                ) : (


                  

                <div className="flex space-x-4">

                  {product.inStock ? (
                    <>
                  <button 
                    onClick={() => {
                      setIsAddingToCart(true);
                      // Delay before adding to cart
                      setTimeout(() => {
                        addToCart(product);
                        setIsAddingToCart(false);
                        

                      }, 800);
                    }}
                    className={`flex-1 bg-gradient-to-r py-2 px-4 cursor-pointer rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50
                    ${darkMode ? 'bg-amber-600 text-gray-100 hover:bg-amber-700' : 'bg-amber-600 text-gray-100 hover:bg-amber-700'}`}
                    >
                    {isAddingToCart ? (
                      <div className={`w-5 h-5 border-2 rounded-full animate-spin ${darkMode ? 'border-white/20 border-t-white' : 'border-gray-500 border-t-gray-600'}`} />
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button className={`px-4 py-2 border-1 cursor-pointer rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg 
                  ${darkMode ? 'border-amber-600 text-gray-300 hover:bg-amber-700 hover:text-white' : 'border-amber-600 text-gray-700 hover:bg-amber-600 hover:text-white'}`}
                  >
                    Order Now
                  </button>
                  </>

                  ) : (

                    <>
                    <button 
                    onClick={() => {
                      setIsAddingToCart(true);
                      // Delay before adding to cart
                      setTimeout(() => {
                        addToCart(product);
                        setIsAddingToCart(false);
                        

                      }, 800);
                    }}
                    className={`flex-1 bg-gradient-to-r py-2 px-4 cursor-pointer rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50
                    ${darkMode ? 'bg-amber-600 text-red-600 hover:bg-amber-700' : 'bg-amber-600 text-red-600 hover:bg-amber-700'}`}
                    disabled={true}
                    >
                    {isAddingToCart ? (
                      <div className={`w-5 h-5 border-2 rounded-full animate-spin ${darkMode ? 'border-white/20 border-t-white' : 'border-gray-500 border-t-gray-600'}`} />
                    ) : (
                      <>
                        <Ban className="w-5 h-5" />
                        <span>Out of Stock</span>
                      </>
                    )}
                  </button>

                  <button className={`px-4 py-2 border-1 cursor-pointer rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 
                  ${darkMode ? 'border-amber-600 text-gray-300  hover:text-white' : 'border-amber-600 text-gray-700 hover:bg-amber-600 hover:text-white'}`}
                  disabled={true}
                  >
                    Order Now
                  </button>
                  </>
                    )}

                  
                </div>
                
                



                )}
              </div>
            </div>

            {/* Features
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
            </div> */}


            {/* Description */}
            <div className={`border-t-1 pt-4 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-bold  mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Description :</h3>
              <p className={` leading-relaxed text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{product.description}</p>
            </div>


            {/* Services */}
            <div className={`border-t-1 pt-4 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Free Delivery</p>
                    <p className="text-sm text-gray-600">Orders over ₦15,000</p>
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
                    <p className="text-sm text-gray-600">5 days return</p>
                  </div>
                </div>
              </div>
            </div>

            

          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;