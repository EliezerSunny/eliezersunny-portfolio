
import React, { useState } from 'react';
// import { Menu, X, Phone, Mail, MapPin, ShoppingBag, Star, Users, Award, Truck } from 'lucide-react';

// import { useOutletContext } from 'react-router-dom';

const Skills = () => {
  
const skills = [

    {
      id: 1,
      name: "Tailwind CSS",
      logo: "/images/tailwindcss.png",
      count: "92%",
    },

    {
      id: 2,
      name: "React",
      logo: "/images/react.png",
      count: "70%",
    },


{
      id: 3,
      name: "PHP (Laravel)",
      logo: "/images/laravel.png",
      count: "96%",
    },

    {
      id: 4,
      name: "Figma",
      logo: "/images/figma.png",
      count: "60%",
    },

    {
      id: 5,
      name: "Python",
      logo: "/images/python.png",
      count: "73%",
    },

    


  ];

  return (
    <div >

      {/* Skills Section */}


<section className="skills-area page-section scroll-to-page" id="skills">
                    <div className="custom-container">
                        <div className="skills-content content-width">
                            <div className="section-header">
                                <h4 className="subtitle scroll-animation" data-animation="fade_from_bottom">
                                    <i className="las la-shapes"></i> my skills
                                </h4>
                                <h1 className="scroll-animation" data-animation="fade_from_bottom">My <span>Advantages</span></h1>
                            </div>
        
                            <div className="row skills text-center">

                                {skills.map(skill => (
                                <div key={skill.id} className="col-md-3 scroll-animation" data-animation="fade_from_left">
                                    <div className="skill">
                                        <div className="skill-inner">
                                            <img src={skill.logo} alt={skill.name} />
                                            <h1 className="percent">{skill.count}</h1>
                                        </div>
                                        <p className="name">{skill.name}</p>
                                    </div>
                                </div>
                                ))}

                            </div>
        
                        </div>
                    </div>
                </section>


                      {/* Skills */}
      
    </div>

    );
};


export default Skills;
