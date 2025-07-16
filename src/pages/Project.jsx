import { useOutletContext, Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Menu, Shirt, X, ShoppingCart, CheckCircle, Ban, ShoppingBag, Heart, Plus, Minus, Trash2, Phone, MapPin, Mail, Facebook, MessageCircle, Instagram, Twitter, Sun, Moon, Star, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const Project = () => {
  

const projects = [

    {
      id: 1,
      title: "Sunny Real ChatApp",
      organization: "EliezerSunny", // new
      category: "Web Development",
      frontend: ["HTML", "CSS", "JavaSript", "ReactJS"],
      backend: ["Laravel", "PHP"],
    //   price: 15000,
    //   originalPrice: 20000, // new
      image: ["/img/projects/chat_page.png"],
      description: "Web Development",
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



  return (
    <div >

      {/* Project Section */}
      <section className="portfolio-area page-section scroll-to-page" id="portfolio">
                    <div className="custom-container">
                        <div className="portfolio-content content-width">
                            <div className="section-header">
                                <h4 className="subtitle scroll-animation" data-animation="fade_from_bottom">
                                    <i className="las la-grip-vertical"></i> portfolio
                                </h4>
                                <h1 className="scroll-animation" data-animation="fade_from_bottom">Featured <span>Projects</span></h1>
                            </div>
        
                            
                            <div className="row portfolio-items">

                                {projects.map(project => (
                                <div key={project.id} className="col-md-12 scroll-animation" data-animation="fade_from_bottom">
                                    <div className="portfolio-item portfolio-full">
                                        <div className="portfolio-item-inner">
                                            <a href={project.image[0]} data-lightbox="example-1">
                                                <img src={project.image[0]} alt={project.title} title={project.title} />
                                            </a>
        
                                            <ul className="portfolio-categories">
                                                <li>
                                                    <a href="#">Figma</a>
                                                </li>
                                                <li>
                                                    <a href="#">Framer</a>
                                                </li>
                                                <li>
                                                    <a href="#">{project.title}</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <h2><a href="#">Bureau - Architecture Studio Website</a></h2>
                                    </div>
                                </div>
                                ))}

                            </div>
                            
        
                        </div>
                    </div>
                </section>



      

      {/* Project */}
      
    </div>
  );
};

export default Project;