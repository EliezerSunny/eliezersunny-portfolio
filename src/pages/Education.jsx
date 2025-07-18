import React from 'react';

const Education = () => {
  const educations = [
    {
      id: 1,
      school: 'University of Abuja',
      programme: 'B. Sc. Computer Science',
      details:
        "Went to University of Abuja, Nigeria. I hold a Degree in Computer Science. I've developed skills in software development, and I'm excited to contribute my expertise to real-world challenges and continue learning in the field.",
      category: 'Degree',
      year: '2018 - 2023',
    },
    {
      id: 2,
      school: "ALX Africa (Remote)",
      programme: "Software Engineering (12-Month Intensive Program)",
      details: "Currently enrolled in ALX Africa’s rigorous Software Engineering program, which covers data structures, algorithms, low-level programming (C), system engineering, DevOps, full-stack web development (HTML, CSS, JS, Python, Django), and collaborative tools like Git and GitHub. This hands-on program emphasizes peer learning, problem solving, and real-world project experience across various domains in tech.",
      category: "Software Engineering",
      year: "2024 - 2025", 
    },
  ];

  return (
    <div>
      {/* Education Section */}
      <section className="resume-area page-section scroll-to-page" id="resume">
        <div className="custom-container">
          <div className="resume-content content-width">
            <div className="section-header">
              <h4
                className="subtitle scroll-animation"
                data-animation="fade_from_bottom"
              >
                <i className="las la-briefcase"></i> Resume
              </h4>
              <h1
                className="scroll-animation"
                data-animation="fade_from_bottom"
              >
                Education & <span>Experience</span>
              </h1>
            </div>

            <div className="resume-timeline">
              {educations.map((education) => (
                <div
                  className="item scroll-animation"
                  data-animation="fade_from_right"
                  key={education.id}
                >
                  <div className="flex justify-between">
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
    </div>
  );
};

export default Education;
