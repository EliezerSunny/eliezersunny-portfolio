import { useOutletContext, Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingCart, CheckCircle, Ban, ShoppingBag, Heart, Plus, Minus, Trash2, Phone, MapPin, Mail, Facebook, MessageCircle, Instagram, Twitter, Sun, Moon, Star, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  
const {
  products,
  addToCart,
  activeCategory,
  setActiveCategory,
  filteredProducts,
  currentImageIndex,
  nextImage,
  prevImage,
  StarRating,
  darkMode,
  sortBy,
  cartRef,
  cartItemCount,
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

  selectedColor,
      setSelectedColor,
      selectedSize,
      setSelectedSize,
  // calculateDiscountValue,
  
} = useOutletContext();


const calculateDiscount = (product) => {

  if(!product.originalPrice || isNaN(product.price) || isNaN(product.originalPrice)) return 0;

    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  };

  // Add state for sidebar if needed
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="pt-24 pb-12">
      <div className="container mx-auto px-4">

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-700 via-purple-600 to-gray-800 rounded-2xl p-4 mb-4 text-white">
          <div className="max-full">
            <h2 className="text-2xl font-bold mb-2">Welcome to Chrisron Wears</h2>
            <p className="text-l mb-2 opacity-90">Your Everyday Comfort</p>
            <p className="text-lg opacity-80">
              Discover our premium collection of comfortable and stylish wear. From casual pants to elegant scarfs, we have everything you need for your wardrobe.
            </p>
          </div>
        </div>

        {/* Category Section */}
        <div className="mb-6 mt-6">
  {/* Title + See All */}
  <div className="flex items-center justify-between">
    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      Category
    </h3>
    <button
      onClick={() => {
        setActiveCategory('all');
        setSidebarOpen(false);
      }}
      className={`text-sm font-medium hover:underline ${darkMode ? 'text-white' : 'text-gray-800'}`}
    >
      See All
    </button>
  </div>

  {/* Categories */}
    <div className="flex flex-wrap justify-between gap-4 mt-4">
    {categories.map((item, index) => {
      const Icon = item.icon;
      const isActive = activeCategory === item.category.toLowerCase();

      // Show only first 5 on small screens
      const isHiddenOnMobile = index >= 4;

      return (
        <div
          key={index}
          className={`
            flex flex-col items-center w-[72px] cursor-pointer 
            ${isHiddenOnMobile ? 'hidden sm:flex' : 'flex'}
          `}
          onClick={() => {
            setActiveCategory(item.category.toLowerCase());
            setSidebarOpen(false);
          }}
        >
          <div className={`
            flex items-center justify-center p-4 rounded-full transition-colors
            ${isActive 
              ? 'bg-yellow-600 text-white' 
              : darkMode 
                ? 'bg-gray-500 text-white' 
                : 'bg-gray-300 text-gray-800'}
          `}>
            <Icon className="w-5 h-5" />
          </div>
          <div className={`text-center font-medium mt-2 text-sm ${
            isActive 
              ? 'text-yellow-600' 
              : darkMode 
                ? 'text-white' 
                : 'text-gray-700'
          }`}>
            {item.category}
          </div>
        </div>
      );
    })}
  </div>
</div>



        {/* Category and Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {activeCategory === 'all' ? 'All Products' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Sort by:
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`appearance-none text-sm px-2 py-2 pr-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="random">Best</option> {/* Random is now the default */}
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="name">Name (A–Z)</option>
              </select>

              <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-2 h-2 pointer-events-none" />
            </div>
          </div>
        </div>





        {/* Products Grid - Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
          {visibleProducts.map(product => (
            <div 
              key={product.id} 
              className={`rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } ${!product.inStock ? 'opacity-75' : ''}`}
            >
              <div className="relative">
                {/* Image Carousel */}
                <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                  <LazyImage
                    src={product.images[currentImageIndex[product.id] || 0]}
                    alt={product.name}
                    className="h-full w-full"
                  />
                  
                  {/* Image Indicators */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {product.images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === (currentImageIndex[product.id] || 0)
                              ? 'bg-white'
                              : 'bg-white bg-opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                

                {/* Stock Status */}
                {!product.inStock && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    Out of Stock
                  </div>
                )}



                {product.originalPrice && product.inStock && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-600 to-pink-500 text-white px-2 py-1 rounded-full font-semibold shadow-lg">
                  -{calculateDiscount(product)}%
                </div>
                )}


                {/* Like Button */}
                <button
                  onClick={() => toggleLike(product.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                    likes.includes(product.id) 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  } hover:scale-110`}
                >
                  <Heart className={`w-4 h-4 ${likes.includes(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <div className="p-3 sm:p-4">
                {/* <h3 
                  onClick={() => handleLinkClick(product.id)}
                  className={`font-semibold text-sm sm:text-lg mb-2 line-clamp-2 cursor-pointer hover:text-yellow-600 transition-colors ${darkMode ? 'text-white' : 'text-gray-800'}`}
                >
                  {product.name}
                </h3> */}

                {/* <Link to={`/products/${product.id}`} > */}
                <h3 
                  onClick={() => handleLinkClick(product.id)}
                  className={`font-semibold text-sm sm:text-lg mb-2 line-clamp-2 cursor-pointer hover:text-yellow-600 transition-colors ${darkMode ? 'text-white' : 'text-gray-800'}`}
                >
                  {product.name}
                </h3>
                {/* </Link> */}
                
                {/* Colors and Rating */}
                <div className='flex justify-between items-center'>
                  {/* Colors */}
                  <div className="flex items-center gap-1 mb-2">
                    <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Colors:</span>
                    <div className="flex gap-1">
                      
                      {product.colors.slice(0, 2).map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-3 h-3 rounded-full border-1 mt-0.5 border-gray-300 ${color.color} transition-all duration-300 ${
                        selectedColor === color.name ? 'ring-1 ring-amber-600 scale-110' : 'hover:scale-110 shadow-lg'
                      }`}
                      title={color.label}
                    />
                  ))}

                      {product.colors.length > 2 && (
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          +{product.colors.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* In-Stock */}
                  {/* <div className="mb-2 text-xs" title="Rating & Review">
                    <CheckCircle className="w-4 h-4" />
                                    <span className="text-sm font-medium">{product.stockCount} in stock</span>
                                  
                  </div> */}
                  {product.inStock ? (
                      <div className="flex items-center space-x-1 text-green-600 mb-2">
                        <CheckCircle className="w-3 h-3" />
                        <span className="text-xs font-medium">{product.stockCount}in stock</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-red-400 mb-2">
                        {/* <CheckCircle className="w-3 h-3" /> */}
                        <Ban className='w-3 h-3' />
                        <span className="text-xs font-medium">Stock</span>
                      </div>
                    )}
                  

                </div>

                {/* Rating */}
                  <div className="mb-2 text-xs" title="Rating & Review">
                    <StarRating rating={product.rating} reviews={product.reviews} />
                  </div>

                <p className={`text-xs sm:text-sm mb-3 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">

                  <div>
                  <span className="text-l sm:text-lg font-bold text-yellow-600">
                    ₦{product.price.toLocaleString()}
                  </span>
                  {/* <span className="text-sm ml-1 text-gray-400 line-through">
                    ₦{product.price.toLocaleString()}
                    </span> */}
                    </div>

                  {/* exist product button change */}
                  {/* {product.quantity >= 0 ? ( */}
                    {/* {product.id && cartItemCount > 0 ? (
              <div className="flex items-center space-x-[-2px]">
                                            <button
                                            ref={cartRef}
                                              onClick={() => updateQuantity(product.id, -1)}
                                              className={`p-1 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                                            >
                                              <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center ">{cartItemCount}</span>
                                            <button
                                              onClick={() => updateQuantity(product.id, 1)}
                                              className={`p-1 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                                            >
                                              <Plus className="w-4 h-4" />
                                            </button>
                                          </div>
            ) : ( */}
              
            
                  
                  <button
                    onClick={() => {
                      setIsAddingToCart(true);
                      // Delay before adding to cart
                      setTimeout(() => {
                        addToCart(product);
                        setIsAddingToCart(false);
                        

                      }, 800);
                    }}
                    disabled={!product.inStock || isAddingToCart}
                    className={`px-2 sm:px-3 py-1.5 rounded-lg font-medium text-sm transition-colors ${
                      product.inStock && !isAddingToCart
                        ? 'bg-amber-600 text-white hover:bg-yellow-600 cursor-pointer'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                  >
                    {isAddingToCart ? (
                      <div className="flex justify-center items-center">
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      </div>
                    ) : product.inStock ? (
                      <div className="flex justify-between items-center gap-0.5">
                        <span className="font-bold text-l">+</span>
                        <ShoppingCart className="w-5 h-4" />
                      </div>
                    ) : (
                      <div className="flex justify-between items-center gap-0.5">
                        <span className="font-bold text-l"><Ban className='w-5 h-4 text-red-500' /></span>
                      </div>
                    )}
                  </button>

                  {/* )} */}

                  {/* exist product button change end */}

                </div>
              </div>
            </div>
          ))}
        </div>


        

        {/* Show loading spinner */}
{loading && (
  <div className="flex justify-center items-center py-8">
    <div className="flex items-center space-x-3">
      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      <span className="text-gray-600">Loading more products...</span>
    </div>
  </div>
)}

{/* Show "all loaded" message */}
{visibleCount >= filteredProducts.length && filteredProducts.length > 0 && (
  <div className="text-center py-8">
    <div className="inline-flex items-center space-x-2 bg-gray-100 px-6 py-3 rounded-full">
      <span className="text-gray-600">You've seen all our products!</span>
      <span className="text-2xl">🎉</span>
    </div>
  </div>
)}


      </div>
    </main>
  );
};

export default Home;