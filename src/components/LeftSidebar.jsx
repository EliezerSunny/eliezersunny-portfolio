

import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, ShoppingBag, Star, Users, Award, Truck } from 'lucide-react';

import { useOutletContext } from 'react-router-dom';

const LeftSidebar = () => {
  

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
       

      {/* LeftSidebar Section */}


<div className="left-sidebar">
        <div className="sidebar-header d-flex align-items-center justify-content-between">
            <img src="/img/logo.png" alt="Logo" />
            <span className="designation">Framer Designer & Developer</span>
        </div>
        <img className="me" src="/img/dev_sunny.jpg" alt="Me" />
        <h2 className="name">Süññy</h2>
        <h2 className="address">Abuja, Nigeria</h2>
        <p className="copyright">&copy; 2025 Süññy. All Rights Reserved</p>
        <ul className="social-profile d-flex align-items-center flex-wrap justify-content-center">
            <li>
                <a href="https://twitter.com/eliezersunny"><i className="lab la-twitter"></i></a>
            </li>
            <li>
                <a href="https://www.instagram.com/@eliezersunny_"><i className="lab la-instagram"></i></a>
            </li>
            <li>
                <a href="https://www.facebook.com/eliezersunny"><i className="lab la-facebook"></i></a>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/eliazer-adetunji-5396b2256"><i className="lab la-linkedin"></i></a>
            </li>
            <li>
                <a href="https://www.github.com/EliezerSunny"><i className="lab la-github"></i></a>
            </li>
        </ul>
        <a href="#contact" className="theme-btn">
            <i className="las la-envelope"></i> Hire Me!
        </a>
    </div>




     {/* LeftSidebar */}
      
    </div>
  );
};

export default LeftSidebar;