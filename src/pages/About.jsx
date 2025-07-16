import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, ShoppingBag, Star, Users, Award, Truck } from 'lucide-react';

import { useOutletContext } from 'react-router-dom';

const About = () => {
  
  const abouts = [

    {
      id: 1,
      firstw: "About",
      secondw: "Me",
      details: "I'm Eliazer “Süññy” Adetunji, a Laravel developer based in Nigeria. I specialize in building robust and dynamic web platforms that help people and organizations solve real problems. Whether it's a real-time messaging app for churches, an academic portal for schools, or an online voting system, I design and code with both purpose and precision. I’m self-motivated, detail-oriented, and committed to writing clean, maintainable code. I love working on meaningful projects and collaborating with teams that value quality and creativity.",
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