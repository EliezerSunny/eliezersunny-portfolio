



import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, ShoppingBag, Star, Users, User, Award, Truck } from 'lucide-react';

import { useOutletContext } from 'react-router-dom';

const GlobalColor = () => {
  

// const {
//   products,
//   addToCart,
//   activeCategory,
//   setActiveCategory,
//   filteredProducts,
//   currentImageIndex,
//   nextImage,
//   prevImage,
//   StarRating,
//   darkMode,
//   sortBy,
//   setSortBy,
//   likes,
//   toggleLike,
//   LazyImage
// } = useOutletContext();


  return (
    <div >
       

         {/* GlobalCVideo and Preloadolor Section */}


       {/* <video className="body-overlay" muted autoplay loop>
        <source src="/images/video1.mp4" type="video/mp4" />
    </video> */}

    <div className="page-loader">
        <div className="bounceball"></div>
    </div>

    <span className="icon-menu">
        <span className="bar"></span>
        <span className="bar"></span>
    </span>

 {/* GlobalCVideo and Preloadolor Section end */}





      {/* GlobalColor Section */}


<div className="global-color">
        <span className="setting-toggle">
            <i className="las la-cog"></i>
        </span>
        <div className="inner">
            <div className="overlay"></div>
            <div className="global-color-option">
                <span className="close-settings">
                    <i className="las la-times"></i>
                </span>
                <h2>Configuration</h2>
                <div className="global-color-option-inner">
                    <p>Colors</p>
                    <div className="color-boxed">
                        <a href="#" className="clr-active" onclick="color1();"></a>
                        <a href="#" onclick="color2();"></a>
                        <a href="#" onclick="color3();"></a>
                        <a href="#" onclick="color4();"></a>
                        <a href="#" onclick="color5();"></a>
                        <a href="#" onclick="color6();"></a>
                        <a href="#" onclick="color7();"></a>
                        <a href="#" onclick="color8();"></a>
                    </div>

                    <p>THREE DIMENSIONAL SHAPES</p>
                    <ul className="themes">
                        <li className="active"><a href="home1.html">Earth Lines Sphere</a></li>
                        <li><a href="home2.html">3D Abstract Ball</a></li>
                        <li><a href="home3.html">Water Waves</a></li>
                        <li><a href="home4.html">Liquids Wavy</a></li>
                        <li><a href="home6.html">Solid Color</a></li>
                        <li><a href="home5.html">Simple Strings</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>


{/* GlobalColor */}
      
    </div>
  );
};

export default GlobalColor;