import React, { useState } from 'react';
// import { Menu, X, Phone, Mail, MapPin, ShoppingBag, Star, Users, Award, Truck } from 'lucide-react';

// import { useOutletContext } from 'react-router-dom';

const Specialization = () => {
  

    const specializations = [

    {
      id: 1,
      title: "SoftWare Engineering",
      details: "I apply software engineering principles to design scallable, secure and efficient systems. This includes structuring databases properly, using version control (Git), managing application state, and ensuring data integrity. I also handle system integration, testing, and deployment, making sure everything runs smoothly from development to production",
      category: "SoftWare Engineering",
      projects: "11",
    },


    {
      id: 2,
      title: "SoftWare Development",
      details: "I develop modern web application using the Laravel framework. From backend logic to frontend design. I build complete system like chat apps, school management system, voting platforms. My focus is on writing clean, maintainable code and creating user-friendly interfaces that work across all devices.",
      category: "Web Development",
      projects: "11",
    },



  ];


  return (
    <div >

      {/* Specialization Section */}
<section className="services-area page-section scroll-to-page" id="services">
                    <div className="custom-container">
                        
                        <div className="services-content content-width">
                            <div className="section-header">
                                <h4 className="subtitle scroll-animation" data-animation="fade_from_bottom">
                                    <i className="las la-stream"></i> Services
                                </h4>
                                <h1 className="scroll-animation" data-animation="fade_from_bottom">My <span>Specializations</span></h1>
                            </div>
        
                            <div className="services-items">

                                {specializations.map(specialization => (
                                <div className="service-item scroll-animation" data-animation="fade_from_bottom">
                                    <i className="las la-bezier-curve"></i>
                                    <h2>{specialization.title}</h2>
                                    <p>{specialization.details}</p>
                                    {/* <span className="projects">{specialization.projects} Projects</span> */}
                                </div>
                                ))}

                            </div>
        
                        </div>

                    </div>
                </section>



      

      {/* Specialization */}
      
    </div>
  );
};

export default Specialization;