import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, ShoppingBag, Star, Users, Award, Truck } from 'lucide-react';

import { useOutletContext } from 'react-router-dom';

const About = () => {
  
  const abouts = [

    {
      id: 1,
      firstw: "About",
      secondw: "Me",
      details: "Since beginning my journey as a freelance designer nearly 8 years ago, I’m a Laravel developer passionate about building clean, scalable, and efficient web applications. I focus on backend development, API integration, real-time features, and database management. I’m committed to delivering high-quality solutions that meet both business goals and user needs.",
      category: "About",
    },
    


  ];


  return (
    <div >
      {/* Header */}
       

      {/* About Section */}
      <section className="about-area page-section scroll-to-page" id="about">
                    <div className="custom-container">

                      {abouts.map(about => (
                        <div className="about-content content-width">
                            <div className="section-header">
                                <h4 className="subtitle scroll-animation" data-animation="fade_from_bottom">
                                    <i className="lar la-user"></i> About
                                </h4>
                                <h1 className="scroll-animation" data-animation="fade_from_bottom">{about.firstw} <span> {about.secondw} </span>
                                  {/* <br />  */}
                                    </h1>
                            </div>
                            <p className="scroll-animation" data-animation="fade_from_bottom">{about.details}</p>
                        </div>
                      ))}

                    </div>
                </section>


      

      {/* About */}
      
    </div>
  );
};

export default About;