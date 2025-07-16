import React, { useState } from 'react';
// import { Menu, X, Phone, Mail, MapPin, ShoppingBag, Star, Users, Award, Truck } from 'lucide-react';

// import { useOutletContext } from 'react-router-dom';

const Contact = () => {
  

// const {
//   projects,
//   activeCategory,
//   setActiveCategory,
//   filteredProjects,
//   currentImageIndex,
//   nextImage,
//   prevImage,
//   darkMode,
//   sortBy,
//   setSortBy,
//   LazyImage
// } = useOutletContext();


  return (
    <div >

      {/* Contact Section */}
      <section className="contact-area page-section scroll-content" id="contact">
                    <div className="custom-container">
                        <div className="contact-content content-width">
                            <div className="section-header">
                                <h4 className="subtitle scroll-animation" data-animation="fade_from_bottom">
                                    <i className="las la-dollar-sign"></i> contact
                                </h4>
                                <h1 className="scroll-animation" data-animation="fade_from_bottom">Let's Work <span>Together!</span></h1>
                            </div>

                            <div className="p-5 border border-gray-200 rounded-4xl">
                            <h3 className="scroll-animation" data-animation="fade_from_bottom">hello@drake.design</h3>
                            <p id="required-msg">* Marked fields are required to fill.</p>

                            <form className="contact-form scroll-animation" data-animation="fade_from_bottom" id="contactForm" action="https://formsubmit.co/0c41d649d185c4eb3e984815f4c25cf7" onsubmit="myFunction()" name="contactForm" method="POST">
                                <div className="alert alert-success messenger-box-contact__msg" style={{display: 'none'}} role="alert">
                                    Your message was sent successfully.
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group">
                                            <label for="full-name">full Name <sup>*</sup></label>
                                            <input type="text" name="full-name" id="full-name" placeholder="Your Full Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group">
                                            <label for="email">Email <sup>*</sup></label>
                                            <input type="email" name="email" id="email" placeholder="Your email adress" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group">
                                            <label for="phone-number">phone <span>(optional)</span></label>
                                            <input type="text" name="phone-number" id="phone-number" placeholder="Your number phone" />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="input-group">
                                            <label for="subject">Subject </label>
                                            <input type="text" name="subject" id="Subject7" placeholder="Subject" />
                                        </div>
                                    </div>

                                    {/* <div className="col-md-6">
                                        <div className="input-group">
                                            <label for="message">Message </label>
                                            <input type="text" name="message" id="message" placeholder="Message" />
                                        </div>
                                    </div> */}

                                    {/* <div className="col-md-6">
                                        <div className="input-group">
                                            <label for="subject">subject <sup>*</sup></label>
                                            <select name="subject" id="subject">
                                                <option value="">Select a subject</option>
                                                <option value="subject1">Subject 1</option>
                                                <option value="subject2">Subject 2</option>
                                                <option value="subject3">Subject 3</option>
                                            </select>
                                        </div>
                                    </div> */}

                                    <div className="col-md-12">
                                        <div className="input-group">
                                            <label for="budget">your budget <span>(optional)</span></label>
                                            <input type="number" name="budget" id="budget" placeholder="A range budget for your project" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="input-group">
                                            <label for="message">message</label>
                                            <textarea name="message" id="message" placeholder="Wrire your message here ..."></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="input-group upload-attachment">
                                            <div>
                                                <label for="upload-attachment">
                                                    <i className="las la-cloud-upload-alt"></i> add an attachment
                                                    <input type="file" name="file" id="upload-attachment" />
                                                </label>
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="input-group submit-btn-wrap">
                                            <button className="theme-btn" name="submit" type="submit" id="submit-form">send message</button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            </div>

                        </div>
                    </div>
                </section>


      

      {/* Contact */}
      
    </div>
  );
};

export default Contact;