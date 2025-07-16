import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, ShoppingBag, Star, Users, Award, Truck } from 'lucide-react';

// import { useOutletContext } from 'react-router-dom';

const Education = () => {
  

    const educations = [

    {
      id: 1,
      school: "University of Abuja",
      programme: "B. Sc. Computer Science",
      details: "Went to University of Abuja, Nigeria. I hold a Degree in Computer Science. I've developed skills in software development, and I'm excited to contribute my expertise to real-world challenges and continue learning in the field.",
      category: "Degree",
      year: "2018 - 2023",
    },


    {
      id: 2,
      school: "ALX Africa",
      programme: "Software Engineering",
      details: "Have a diverse range of experience having worked across various fields.",
      category: "Remote",
      year: "2024 - 2025",
    },

    


  ];


  return (
    <div >

      {/* Education Section */}
<section className="resume-area page-section scroll-to-page" id="resume">
                    <div className="custom-container">
                        <div className="resume-content content-width">
                            <div className="section-header">
                                <h4 className="subtitle scroll-animation" data-animation="fade_from_bottom">
                                    <i className="las la-briefcase"></i> Resume
                                </h4>
                                <h1 className="scroll-animation" data-animation="fade_from_bottom">Education & <span>Experience</span></h1>
                            </div>
        
                            <div className="resume-timeline">

                                {educations.map(education => (
                                <div className="item scroll-animation" data-animation="fade_from_right">
                                    <div className='flex justify-between'>
                                    <span className="school">{education.school}</span>
                                    <span className="date">{education.year}</span>
                                    </div>
                                    <h2>{education.programme}</h2>
                                    <p>{education.details}</p>
                                </div>
                                ))}

                            </div>
        
                        </div>
                    </div>
                </section>




      

      {/* Education */}
      
    </div>
  );
};

export default Education;