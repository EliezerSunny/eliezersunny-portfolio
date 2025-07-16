import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ContactRound, Shirt, WalletCards, CheckCircle, Boxes, Loader2, ShoppingCart, ShoppingBag, Heart, Plus, Minus, Trash2, Phone, MapPin, Mail, Facebook, MessageCircle, Instagram, Twitter, Sun, Moon, Star, ChevronDown, ChevronLeft, ChevronRight, Ribbon } from 'lucide-react';

import { Outlet, useNavigate, Link } from 'react-router-dom'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [likesOpen, setLikesOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState("random");
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const sidebarRef = useRef(null);
  const cartRef = useRef(null);
  const likesRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState('white');
  const [selectedSize, setSelectedSize] = useState('M');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [removeSuccessMessage, removeShowSuccessMessage] = useState(false);

  const [showSuccessMessageLike, setShowSuccessMessageLike] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });


  //  const [existBotton, setExistBotton] = useState([]);


  // const [product, setProducts] = useState([]);
  //  const [loading, setLoading] = useState(false);

   const [visibleCount, setVisibleCount] = useState(8);
const [loading, setLoading] = useState(false);
const itemsPerLoad = 8;



  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const year = new Date().getFullYear('Y');

  const navigate = useNavigate();

  const handleLinkClick = (id) => {
    navigate(`/products/${id}`);
  };

  // Enhanced products data with multiple images, colors, stock, and ratings
  const products = [
    // {
    //   id: 1,
    //   name: "Premium Cloth",
    //   category: "clothes",
    //   price: 15000,
    //   images: ["/img/luxurious.jpg", "/img/1_2dc6754d-d535-41f2-a5a6-9630c0eecc11.webp", "/img/rBEe_GLSyCiALuxGAALbg9M89LI22.jpeg"],
    //   colors: [""],
    //   description: "Comfortable everyday wear with premium cotton fabric",
    //   inStock: true,
    //   rating: 5.0,
    //   reviews: 23
    // },

    {
      id: 1,
      name: "Premium Cloth",
      brand: "CHRISRON WEARS", // new
      category: "clothes",
      price: 15000,
      originalPrice: 20000, // new
      images: ["/img/luxurious.jpg", "/img/ChrisronWear2.png", "/img/ChrisronWear.png"],
      colors: [
      { name: 'white', color: 'bg-white', label: 'White' },
      { name: 'black', color: 'bg-black', label: 'Black' },
      { name: 'blue', color: 'bg-gradient-to-br from-blue-400 to-blue-600', label: 'Ocean Blue' },
      { name: 'gray', color: 'bg-gradient-to-br from-green-400 to-green-600', label: 'Green' }
    ], // new
      description: "Comfortable everyday wear with premium cotton fabric",
      sizes: ['S', 'M', 'L', 'XL'], // new
      inStock: true,
      stockCount: 11, // new
      rating: 5.0,
      reviews: 9,
    },

    


  ];

  const categories = [
    {
      id: 1,
      category: "Web Development",
      icon: Shirt,
    },
    
    
  ];


 


  // Auto carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const newIndex = {};
        products.forEach(product => {
          if (product.images.length > 1) {
            const currentIndex = prev[product.id] || 0;
            newIndex[product.id] = (currentIndex + 1) % product.images.length;
          }
        });
        return { ...prev, ...newIndex };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  // Lazy Loading Component
  const LazyImage = ({ src, alt, className }) => {
    const [loaded, setLoaded] = useState(false);
    const [inView, setInView] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div ref={imgRef} className={className}>
        {inView ? (
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setLoaded(true)}
          />
        ) : (
          <div className={`w-full h-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse flex items-center justify-center`}>
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    );
  };

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
      if (likesRef.current && !likesRef.current.contains(event.target)) {
        setLikesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cart functions
  const addToCart = (product) => {
    if (!product.inStock) {
      alert('This product is currently out of stock!');
      return;
    }

    setShowSuccessMessage(true);

                        // Hide success message after 3 seconds 
                        setTimeout(() => setShowSuccessMessage(false), 3000);
    
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));

     removeShowSuccessMessage(true);

                        // Hide success message after 3 seconds 
                        setTimeout(() => removeShowSuccessMessage(false), 3000);

  };

  const clearCart = () => {
    setCart([]);

     setShowSuccessMessage(true);

                        // Hide success message after 3 seconds 
                        setTimeout(() => setShowSuccessMessage(false), 3000);

  };

  const toggleLike = (productId) => {
    setLikes(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );


     setShowSuccessMessageLike(true);

                        // Hide success message after 3 seconds 
                        setTimeout(() => setShowSuccessMessageLike(false), 3000);
                        
  };

  // WhatsApp order function
  const sendWhatsAppOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!customerInfo.name) {
      alert('Please fill in your Name!');

      // setNameRequired('Please fill in your Name!');
      // // Hide success message after 3 seconds 
      // setTimeout(() => setNameRequired(false), 3000);
                       
      return;
    }

    if (!customerInfo.phone) {
      alert('Please fill in your Phone Number!');
      return;
    }
    if (!customerInfo.address) {
      alert('Please fill in your Address!');
      return;
    }

    const currentUrl = window.location.origin;

    const orderDetails = cart.map(item => `
    *Title:* ${item.name}\n 
    *Quantity:* ${item.quantity}\n 
    *Price:* ₦${(item.price * item.quantity).toLocaleString()}\n
    *Color:* ${item.colors.name}\n
    *Size:* ${item.sizes}\n
    *Image📸:* ${currentUrl}${item.images[0]}
    `).join('\n');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const message = `
      _Hello Chrisron Wears!_

      *🛒 NEW ORDER REQUEST*
        
      *👤 Customer Details:*\n
      Name: ${customerInfo.name}\n
      ${customerInfo.phone ? `Phone: ${customerInfo.phone}` : ''}\n
      ${customerInfo.address ? `Address: ${customerInfo.address}` : ''}\n

      
      *📦 Order Items:*

      *I would like to place an order:*

      ${orderDetails}\n

      *Total Amount:* ₦${total.toLocaleString()}\n
        
      _Please confirm availability and delivery details. Thank You!_
      `;

      // const businessWhatsApp = '2348149028042';

      const businessWhatsApp = '2349154679940';
    
    const whatsappUrl = `https://wa.me/${businessWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };




  // Loadmore start

//   const [sortBy, setSortBy] = useState('random');
// const [products, setProducts] = useState([]); // your original product list
const shuffledOnLoad = useRef([]);




useEffect(() => {
  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const shuffled = [...filtered];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // true randomness per page load
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  shuffledOnLoad.current = shuffled;
}, []); // ✅ run once on page load




   const getSortedProducts = () => {
  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  if (sortBy === 'random') {
    // Use one-time shuffle, filter it again based on category
    return activeCategory === 'all'
      ? shuffledOnLoad.current
      : shuffledOnLoad.current.filter(p => p.category === activeCategory);
  }


  return [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'name': return b.name - a.name;
      case 'random': default: return a.random.localeCompare(b.random);
    }
  });
};





const filteredProducts = getSortedProducts(); // ✅ no filtering here
      

// Slice visible products
const visibleProducts = filteredProducts.slice(0, visibleCount);

// Scroll handler to load more
useEffect(() => {
  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

    if (bottom && visibleCount < filteredProducts.length) {
      setLoading(true);
      setTimeout(() => {
        setVisibleCount(prev => prev + itemsPerLoad);
        setLoading(false);
      }, 600); // simulate network delay
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [visibleCount, filteredProducts.length]);



    // Loadmore end



    
  
  const likedProducts = products.filter(product => likes.includes(product.id));

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Rating component
  const StarRating = ({ rating, reviews }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className={`text-xs ml-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          ({reviews})
        </span>
      </div>
    );
  };

  // Image carousel controls
  const nextImage = (productId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (productId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + totalImages) % totalImages
    }));
  };


  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}

      
      {/* <Header /> */}
      <div className='fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/20 w-full h-19'>
  {/* Your header content */}


      <header className={` backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg fixed top-0 w-[98.5%] z-40 transition-colors duration-300 rounded-3xl m-1 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                
                
                
      
                
                <a href="/" rel="noopener noreferrer">
                <div className="text-left pr-2">
                  {/* <h1 className="text-2xl font-bold text-yellow-600">CHRISRON WEARS</h1>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your Everyday Comfort</p> */}
                  <img src='/img/ChrisronWear.png' alt='ChrisronWear' className='rounded-full w-[80px] lg:hidden' />
                </div>
                </a>
      
                <marquee behavior="scroll" direction="left" className='text-1xlg'>
                  <span className='font-bold text-amber-600'>Welcome </span>
                  <span className='font-bold text-amber-400'>to </span>
                  <span className='font-bold text-amber-600'>Chrisron </span>
                  <span className='font-bold text-amber-400'>Wears. </span>
                  <span className='font-bold text-amber-700'>Your </span>
                  <span className='font-bold text-amber-500'>Everyday </span>
                  <span className='font-bold text-amber-700'>Comfort!!! </span>
               </marquee>
      
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  
                  <button
                    onClick={() => setLikesOpen(true)}
                    className={`relative p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <Heart className="w-6 h-6" />
                    {likes.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {likes.length}
                      </span>
                    )}
                  </button>
      
                  <button
                    onClick={() => setCartOpen(true)}
                    className={`relative p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <ShoppingCart className="w-6 h-6" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
      
                  {/* <div className="flex items-center gap-4"> */}
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className={`p-2 rounded-lg transition-colors lg:hidden ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                  
                  
                {/* </div> */}
      
                </div>
              </div>
            </header>
</div>



{/* Success Message */}
        {showSuccessMessageLike && (
                <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-in slide-in-from-right duration-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Like Updated Successfully!</span>
                </div>
              )}

              {showSuccessMessage && (
                <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-in slide-in-from-right duration-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Cart Updated Successfully!</span>
                </div>
              )}
              {removeSuccessMessage && (
                <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-in slide-in-from-right duration-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Removed successfully!</span>
                </div>
              )}



      {/* Sidebar Navigation */}
      <div className={`fixed inset-0 z-50 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <nav
          ref={sidebarRef}
          className={`rounded-3xl m-1 absolute left-0 top-0 bottom-0 w-80 shadow-xl transform transition-all duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 h-[300px] overflow-y-auto">
              <button
                onClick={() => {setActiveCategory('all'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'all' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => {setActiveCategory('pants'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'pants' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Pants
              </button>
              <button
                onClick={() => {setActiveCategory('boxers'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'boxers' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Boxers
              </button>
              <button
                onClick={() => {setActiveCategory('singlets'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'singlets' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Singlets
              </button>
              <button
                onClick={() => {setActiveCategory('scarfs'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'scarfs' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Scarfs
              </button>
              <button
                onClick={() => {setActiveCategory('sneakers'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'sneakers' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Sneaker
              </button>

              <button
                onClick={() => {setActiveCategory('jackets'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'jackets' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Jacket
              </button>
              <button
                onClick={() => {setActiveCategory('dresses'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'dresses' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Dress
              </button>

              <button
                onClick={() => {setActiveCategory('bags'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'bags' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Bag
              </button>
            </div>

            <div className={`mt-6 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Contact Info</h3>
              <div className={`space-y-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>

                <div className="flex items-center gap-2">
                  <ContactRound className="w-4 h-4" />
                  <Link to="/about" >
                  <span>About Us</span>
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4" />
                  <span>+234 915 467 9940</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Ogbomoso, Oyo State. Nigeria</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <a href="https://wa.me/2349154679940?text=Hello Chrisron Wears!" target="_blank" rel="noopener noreferrer"><MessageCircle className="w-5 h-5 text-blue-400 cursor-pointer hover:scale-110 transition-transform" /></a>
                {/* <a href="#" target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5 text-pink-400 cursor-pointer hover:scale-110 transition-transform" /></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><Twitter className="w-5 h-5 text-blue-300 cursor-pointer hover:scale-110 transition-transform" /></a> */}
                </div>
            </div>
          </div>
        </nav>
      </div>




      {/* Likes Sidebar */}
      <div className={`fixed inset-0 z-50 transition-opacity ${likesOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          ref={likesRef}
          className={` rounded-3xl m-1 absolute right-0 top-0 bottom-0 w-80 overflow-y-auto shadow-xl transform transition-all duration-300 ${
            likesOpen ? 'translate-x-0' : 'translate-x-full'
          } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Liked Items</h2>
              <button
                onClick={() => setLikesOpen(false)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {likedProducts.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No liked items yet</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4">
                {likedProducts.map(product => (
                  <div key={product.id} className={`rounded-lg p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-start gap-3">
                      <LazyImage
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-medium truncate ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {product.name}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          ₦{product.price.toLocaleString()}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <StarRating rating={product.rating} reviews={product.reviews} />
                          <button
                            onClick={() => toggleLike(product.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>



      {/* Cart Sidebar */}
      <div className={`fixed inset-0 z-50 transition-opacity ${cartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          ref={cartRef}
          className={` rounded-3xl m-1 absolute right-0 top-0 bottom-0 w-80 overflow-y-auto shadow-xl transform transition-all duration-300 ${
            cartOpen ? 'translate-x-0' : 'translate-x-full'
          } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Shopping Cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            

            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your cart is empty</p>
              </div>
            ) : (
              <>



                {/* cart form fill */}
            {/* Customer Info */}
              <div className="mb-3">
                <h4 className= {` font-semibold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Customer Information :</h4>
                <div className= {` space-y-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <textarea
                    placeholder="Delivery Address *"
                    required
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    rows="3"
                  />
                </div>

                <hr className='text-gray-600 mt-2' />
              </div> 

              
              {/* cart form fill end */}





                <div className="flex-1 overflow-y-auto space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className={`rounded-lg p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-start gap-3">
                        <LazyImage
                          src={item.images[0]}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-medium truncate ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {item.name}
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            ₦{item.price.toLocaleString()}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className={`p-1 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className={`p-1 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`border-t pt-4 mt-4 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-lg">Total: ₦{cartTotal.toLocaleString()}</span>
                    <button
                      onClick={clearCart}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Clear Cart
                    </button>
                  </div>
                  <button
                    onClick={sendWhatsAppOrder}
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                  >
                    Order via WhatsApp
                  </button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    You'll be redirected to WhatsApp to complete your order
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>







<div className='flex'>

{/* Desktop Navigation Sidebar */}
      <div className={`rounded-3xl m-1 sticky z-50 left-0 top-0 h-screen w-70 hidden lg:flex shadow-xl transform transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {/* Sidebar Navigation */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
        
          <div className="p-6">

            <a href="/" rel="noopener noreferrer">
            <div className='flex justify-around items-center pb-4'>

              <div>
            
            <img src='/img/ChrisronWear.png' alt='ChrisronWear' className='rounded-full w-[40px]' />
            
            </div>

            <div>
            <h1 className="text-2xsm font-bold text-yellow-600">CHRISRON WEARS</h1>
            <p className={`text- ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your Everyday Comfort</p>
            </div>

            </div>
            </a>


            <div className="flex items-center justify-between mb-4 mt-4">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Menu</h2>
              
            </div>


            <div className="space-y-4 h-[300px] overflow-y-auto">
              <button
                onClick={() => {setActiveCategory('all'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'all' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => {setActiveCategory('pants'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'pants' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Pants
              </button>
              <button
                onClick={() => {setActiveCategory('boxers'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'boxers' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Boxers
              </button>
              <button
                onClick={() => {setActiveCategory('singlets'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'singlets' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Singlets
              </button>
              <button
                onClick={() => {setActiveCategory('scarfs'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'scarfs' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Scarfs
              </button>
              <button
                onClick={() => {setActiveCategory('sneakers'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'sneakers' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Sneaker
              </button>

              <button
                onClick={() => {setActiveCategory('jackets'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'jackets' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Jacket
              </button>
              <button
                onClick={() => {setActiveCategory('dresses'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'dresses' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Dress
              </button>

              <button
                onClick={() => {setActiveCategory('bags'); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === 'bags' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Bag
              </button>
            </div>

            <div className={`mt-6 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Contact Info</h3>
              <div className={`space-y-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>

                <div className="flex items-center gap-2">
                  <ContactRound className="w-4 h-4" />
                  <Link to="/about" >
                  <span>About Us</span>
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4" />
                  <span>+234 915 467 9940</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Ogbomoso, Oyo State. Nigeria</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <a href="https://wa.me/2349154679940?text=Hello Chrisron Wears!" target="_blank" rel="noopener noreferrer"><MessageCircle className="w-5 h-5 text-blue-400 cursor-pointer hover:scale-110 transition-transform" /></a>
                {/* <a href="#" target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5 text-pink-400 cursor-pointer hover:scale-110 transition-transform" /></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><Twitter className="w-5 h-5 text-blue-300 cursor-pointer hover:scale-110 transition-transform" /></a> */}
                </div>
            </div>
          </div>
            </nav>
      </div>
      {/* Desktop Navigation Sidebar End */}




<div className='flex-1'>
      {/* Main Content */}


    <Outlet context={{
      cart,
      cartRef,
      setCart,
      likes,
      setLikes,
      activeCategory,
      setActiveCategory,
      products,
      addToCart,
      toggleLike,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartTotal,
      cartItemCount,
      likedProducts,
      filteredProducts,
      darkMode,
      toggleDarkMode,
      currentImageIndex,
      setCurrentImageIndex,
      nextImage,
      prevImage,
      StarRating,
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
      // existing,
      // product,
    }} />
    
      

      {/* Footer */}
      <footer className={` rounded-3xl m-1 py-12 ${darkMode ? 'bg-gray-800' : 'bg-gray-800'} text-white`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">CHRISRON WEARS</h3>
              <p className="text-gray-300 mb-4">Your Everyday Comfort</p>
              <p className="text-gray-400">
                Quality clothing and accessories for your daily comfort and style needs.
              </p>
            </div>

            
            <div>
              <h4 className="font-semibold mb-4">Contact Information</h4>
              <div className="space-y-2 text-gray-300">

                <div className="flex items-center gap-2">
                  <ContactRound className="w-4 h-4" />
                  <Link to="/about" >
                  <span>About Us</span>
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+234 915 467 9940</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+234 802 372 4063</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Ogbomoso, Oyo State. Nigeria</span>
                </div>
              </div>

         <iframe
                            className="mt-4 overflow-hidden border-2 border-platinum dark:border-yellow-400 embed-map rounded-2xl"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126386.44439358254!2d4.167383965222097!3d8.144533130450526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10370d45f7179427%3A0x3f70123a2b1a4e05!2sOgbomoso%2C%20Oyo!5e0!3m2!1sen!2sng!4v1751309068391!5m2!1sen!2sng"
                            loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                            aria-label="Contact Map">
                        </iframe>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                <a href="https://wa.me/2349154679940?text=Hello Chrisron Wears!" target="_blank" rel="noopener noreferrer"><MessageCircle className="w-5 h-5 text-blue-400 cursor-pointer hover:scale-110 transition-transform" /></a>
                {/* <a href="#" target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5 text-pink-400 cursor-pointer hover:scale-110 transition-transform" /></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><Twitter className="w-5 h-5 text-blue-300 cursor-pointer hover:scale-110 transition-transform" /></a> */}
                </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {year} Chrisron Wears. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>

      </div>

    </div>
  );
};

export default Layout;
