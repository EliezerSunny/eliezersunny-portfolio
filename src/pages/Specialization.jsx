import React from 'react';

const Specialization = () => {
  const specializations = [
    {
      id: 1,
      title: "Software Engineering",
      details:
        "I apply software engineering principles to design scalable, secure, and efficient systems. This includes structuring databases properly, using version control (Git), managing application state, and ensuring data integrity. I also handle system integration, testing, and deployment, making sure everything runs smoothly from development to production.",
      category: "Software Engineering",
      projects: "11",
    },
    {
      id: 2,
      title: "Software Development",
      details:
        "I develop modern web applications using the Laravel framework from backend logic to frontend design. I build complete systems like chat apps, school management platforms, and voting systems. My focus is on writing clean, maintainable code and creating user-friendly interfaces that work across all devices.",
      category: "Web Development",
      projects: "11",
    },
  ];

  return (
    <div>
      {/* Specialization Section */}
      <section
        className="services-area page-section scroll-to-page"
        id="services"
      >
        <div className="custom-container">
          <div className="services-content content-width">
            <div className="section-header">
              <h4
                className="subtitle scroll-animation"
                data-animation="fade_from_bottom"
              >
                <i className="las la-stream"></i> Services
              </h4>
              <h1
                className="scroll-animation"
                data-animation="fade_from_bottom"
              >
                My <span>Specializations</span>
              </h1>
            </div>

            <div className="services-items">
              {specializations.map((specialization) => (
                <div
                  className="service-item scroll-animation"
                  data-animation="fade_from_bottom"
                  key={specialization.id}
                >
                  <i className="las la-bezier-curve"></i>
                  <h2>{specialization.title}</h2>
                  <p>{specialization.details}</p>
                  <span className="projects text-sm text-gray-400 block mt-2">
                    {specialization.projects} Projects
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Specialization;
