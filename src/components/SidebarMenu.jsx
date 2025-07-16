



import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, ShoppingBag, Star, Users, User, Award, Truck, Twitter, Linkedin, Facebook, Instagram, Github } from 'lucide-react';

import { useOutletContext } from 'react-router-dom';

const SidebarMenu = () => {
  


  return (
    <div >
       

      {/* SidebarMenu Section */}
<div className="responsive-sidebar-menu">
        <div className="overlay"></div>
        <div className="sidebar-menu-inner">
            <div className="menu-wrap">
                <p>Menu</p>
                <ul className="menu scroll-nav-responsive d-flex">
                    <li>
                        <a className="scroll-to" href="#home">
                            <i className="las la-home"></i> <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a className="scroll-to" href="#about">
                            <i className="lar la-user"></i> <span>About</span>
                        </a>
                    </li>
                    <li>
                        <a className="scroll-to" href="#resume">
                            <i className="las la-briefcase"></i> <span>Resume</span>
                        </a>
                    </li>
                    <li>
                        <a className="scroll-to" href="#services">
                            <i className="las la-stream"></i> <span>Services</span>
                        </a>
                    </li>
                    <li>
                        <a className="scroll-to" href="#skills">
                            <i className="las la-shapes"></i> <span>Skills</span>
                        </a>
                    </li>
                    <li>
                        <a className="scroll-to" href="#portfolio">
                            <i className="las la-grip-vertical"></i> <span>Portfolios</span>
                        </a>
                    </li>
                    <li>
                        <a className="scroll-to" href="#testimonial">
                            <i className="lar la-comment"></i> <span>Testimonial</span>
                        </a>
                    </li>
                    <li>
                        <a className="scroll-to" href="#contact">
                            <i className="las la-envelope"></i> <span>Contact</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="sidebar-social">
                <p>Social</p>
                <ul className="social-links d-flex align-items-center">
                    <li>
                <a href="https://twitter.com/eliezersunny"><Twitter /></a>
            </li>
            <li>
                <a href="https://www.instagram.com/@eliezersunny_"><Instagram /></a>
            </li>
            <li>
                <a href="https://www.facebook.com/eliezersunny"><Facebook /></a>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/eliazer-adetunji-5396b2256"><Linkedin /></a>
            </li>
            <li>
                <a href="https://www.github.com/EliezerSunny"><Github /></a>
            </li>
                </ul>
            </div>
        </div>
    </div>


    {/* SidebarMenu */}
      
    </div>
  );
};

export default SidebarMenu;
