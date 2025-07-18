import { useOutletContext, Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Menu, Shirt, X, ShoppingCart, CheckCircle, Ban, ShoppingBag, Heart, Plus, Minus, Trash2, Phone, MapPin, Mail, Facebook, MessageCircle, Instagram, Twitter, Sun, Moon, Star, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const Project = () => {
  

const projects = [

    {
      id: 1,
      title: "Sunny Real ChatApp (Private)",
      organization: "EliezerSunny",
      category: "Web Development",
      link: "#",
      frontend: ["Livewire"],
      backend: ["Laravel"],
      image: "/img/projects/chat_page.png",
      description: "Web Development",
      rating: 5.0,
      reviews: 9,
    },


    {
      id: 2,
      title: "Online Voting System",
      organization: "EliezerSunny",
      category: "Web Development",
      link:"https://EliezerSunny.github.io/Online-Voting-System-Laravel-12/",
      frontend: ["Livewire"],
      backend: ["Laravel"],
      image: "/img/projects/voting_page.png",
      description: "Web Development",
      rating: 5.0,
      reviews: 9,
    },


    {
      id: 3,
      title: "Uniabuja Portal",
      organization: "EliezerSunny",
      category: "Web Development",
      link: "https://EliezerSunny.github.io/University-of-Abuja-School-Management-System-Laravel-Project/",
      frontend: ["Livewire"],
      backend: ["Laravel"],
      image: "/img/projects/student_login.png",
      description: "Web Development",
      rating: 5.0,
      reviews: 9,
    },


    {
      id: 4,
      title: "OIM C&S DIVINE HELP (Private)",
      organization: "EliezerSunny",
      category: "Web Development",
      link: "#",
      frontend: ["Livewire"],
      backend: ["Laravel"],
      image: "/img/projects/divine_help1.png",
      description: "Web Development",
      rating: 5.0,
      reviews: 9,
    },


    {
      id: 5,
      title: "MaxBeatx (Private)",
      organization: "EliezerSunny",
      category: "Web Development",
      link: "#",
      frontend: ["Livewire"],
      backend: ["Laravel"],
      image: "/img/projects/maxbeatx.png",
      description: "Web Development",
      rating: 5.0,
      reviews: 9,
    },


    {
      id: 6,
      title: "Chrisron Wear",
      organization: "EliezerSunny",
      category: "Web Development",
      link: "https://chrisronwearsite.vercel.app/",
      frontend: ["React"],
      backend: [""],
      image: "/img/projects/ChrisronWear.png",
      description: "Web Development",
      rating: 5.0,
      reviews: 9,
    },


    {
      id: 7,
      title: "BSS",
      organization: "EliezerSunny",
      category: "Web Development",
      link: "https://EliezerSunny.github.io/First-laravel-project/",
      frontend: ["Livewire"],
      backend: ["Laravel"],
      image: "/img/projects/Bss_login.png",
      description: "Web Development",
      rating: 5.0,
      reviews: 9,
    },


    {
      id: 8,
      title: "Jumia React",
      organization: "EliezerSunny",
      category: "Web Development",
      link: "https://jumia-react.vercel.app/",
      frontend: ["React"],
      backend: [""],
      image: "/img/projects/jumia_react.png",
      description: "Web Development",
      rating: 5.0,
      reviews: 9,
    },


    {
      id: 9,
      title: "Meme Site",
      organization: "EliezerSunny",
      category: "Web Development",
      link: "https://github.com/EliezerSunny/Meme_site",
      frontend: ["Livewire"],
      backend: ["Laravel"],
      image: "/img/projects/meme_site.jpg",
      description: "Web Development",
      rating: 5.0,
      reviews: 9,
    },





    {
      id: 10,
      title: "News Web App",
      organization: "EliezerSunny",
      category: "Web Development",
      link: "https://github.com/EliezerSunny/News-API-Flask-ALX",
      frontend: [""],
      backend: ["Flask, API"],
      image: ["/img/projects/news_webapp.jpg"],
      description: "Web Development",
      rating: 5.0,
      reviews: 9,
    },


    {
      id: 11,
      title: "Flight Tracker",
      organization: "EliezerSunny",
      category: "Web Development",
      link: "https://github.com/EliezerSunny/Flight-tracker-vercel",
      frontend: [""],
      backend: ["Flask"],
      image: "/img/projects/flight_tracker.jpg",
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
                                    <a href={project.link} target='_blank'>
                                    <div className="portfolio-item portfolio-full">
                                        <div className="portfolio-item-inner">
                                            <a href={project.link} data-lightbox="example-1">
                                                <img src={project.image} alt={project.title} title={project.title} />
                                            </a>
        
                                            <ul className="portfolio-categories">
                        {project.frontend.map((tool, index) => (
                            <li key={`frontend-${index}`}>
                                <a href="#portfolio" title='Front-End'>{tool}</a>
                            </li>
                        ))}

                        {project.backend.map((tool, index) => (
                            <li key={`backend-${index}`}>
                                <a href="#portfolio" title='Back-End'>{tool}</a>
                            </li>
                        ))}
                    </ul>
                                        </div>
                                        <h2><a href={project.link}>{project.title}</a></h2>
                                    </div>
                                    </a>
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