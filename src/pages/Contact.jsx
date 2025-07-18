import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    budget: '',
    message: '',
    file: null
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload support
      const submitData = new FormData();
      submitData.append('full-name', formData.fullName);
      submitData.append('email', formData.email);
      submitData.append('phone-number', formData.phoneNumber);
      submitData.append('subject', formData.subject);
      submitData.append('budget', formData.budget);
      submitData.append('message', formData.message);
      
      if (formData.file) {
        submitData.append('file', formData.file);
      }

      const response = await fetch('https://formsubmit.co/0c41d649d185c4eb3e984815f4c25cf7', {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        setShowSuccess(true);
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          subject: '',
          budget: '',
          message: '',
          file: null
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        alert('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="contact-area page-section scroll-content" id="contact">
        <div className="custom-container">
          <div className="contact-content content-width">
            <div className="section-header">
              <h4 className="subtitle scroll-animation" data-animation="fade_from_bottom">
                <i className="las la-envelope"></i> contact
              </h4>
              <h1 className="scroll-animation" data-animation="fade_from_bottom">
                🚀 Let's Build <span>Something Together!</span>
              </h1>
            </div>

            <div className="p-5 border-[0.3px] border-[#565656] rounded-4xl">
              <p id="required-msg">* Marked fields are required to fill.</p>

              <form className="contact-form scroll-animation" data-animation="fade_from_bottom" onSubmit={handleSubmit}>
                
                {/* Success Message */}
                {showSuccess && (
                  <div className="alert alert-success messenger-box-contact__msg" role="alert">
                    Your message was sent successfully!
                  </div>
                )}

                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group">
                      <label htmlFor="full-name">Full Name <sup>*</sup></label>
                      <input 
                        type="text" 
                        name="fullName" 
                        id="full-name" 
                        placeholder="Your Full Name" 
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="input-group">
                      <label htmlFor="email">Email <sup>*</sup></label>
                      <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Your email address" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="input-group">
                      <label htmlFor="phone-number">Phone <span>(optional)</span></label>
                      <input 
                        type="text" 
                        name="phoneNumber" 
                        id="phone-number" 
                        placeholder="Your phone number" 
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-group">
                      <label htmlFor="subject">Subject <sup>*</sup></label>
                      <input 
                        type="text" 
                        name="subject" 
                        id="subject" 
                        placeholder="Subject" 
                        value={formData.subject}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="input-group">
                      <label htmlFor="budget">Your Budget <span>(optional)</span></label>
                      <input 
                        type="number" 
                        name="budget" 
                        id="budget" 
                        placeholder="A range budget for your project" 
                        value={formData.budget}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-12">
                    <div className="input-group">
                      <label htmlFor="message">Message <sup>*</sup></label>
                      <textarea 
                        name="message" 
                        id="message" 
                        placeholder="Write your message here ..." 
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="col-md-12">
                    <div className="input-group upload-attachment">
                      <div>
                        <label htmlFor="upload-attachment">
                          <i className="las la-cloud-upload-alt"></i> Add an attachment <span>(optional)</span>
                          <input 
                            type="file" 
                            name="file" 
                            id="upload-attachment"
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-12">
                    <div className="input-group submit-btn-wrap">
                      <button 
                        className="theme-btn" 
                        type="submit" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;