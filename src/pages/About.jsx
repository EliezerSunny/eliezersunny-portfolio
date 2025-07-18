import React from 'react';

const About = () => {
  const abouts = [
    {
      id: 1,
      title: "About",
      highlight: "Me",
      details:
        "I'm Eliazer “Süññy” Adetunji, a Laravel developer based in Nigeria. I specialize in building robust and dynamic web platforms that help people and organizations solve real problems. Whether it's a real-time messaging app, business site, an academic portal for schools, or an online voting system, I design and code with both purpose and precision. I’m self-motivated, detail-oriented, and committed to writing clean, maintainable code. I love working on meaningful projects and collaborating with teams that value quality and creativity.",
    },
  ];

  return (
    <div>
      {/* About Section */}
      <section className="about-area page-section scroll-to-page" id="about">
        <div className="custom-container">
          {abouts.map((about) => (
            <div className="about-content content-width" key={about.id}>
              <div className="section-header">
                <h4
                  className="subtitle scroll-animation"
                  data-animation="fade_from_bottom"
                >
                  <i className="lar la-user"></i> About
                </h4>
                <h1
                  className="scroll-animation"
                  data-animation="fade_from_bottom"
                >
                  {about.title} <span>{about.highlight}</span>
                </h1>
              </div>
              <p
                className="scroll-animation"
                data-animation="fade_from_bottom"
              >
                {about.details}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
