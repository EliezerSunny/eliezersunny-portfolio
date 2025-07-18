import React from 'react';

const Introduction = () => {
  const introductions = [
    {
      id: 1,
      labelPrefix: "I'm a",
      title: "Software Developer",
      details:
        "I’m a Software Developer passionate about turning ideas into real-world solutions from school management systems and chat apps to voting platforms and music websites. With Laravel as my core stack, I craft clean, functional, and scalable code that delivers results.",
      category: "Introduction",
      years: "4+",
      projects: "11",
    },
  ];

  return (
    <div>
      <section className="hero-section page-section scroll-to-page" id="home">
        <div className="custom-container">
          {introductions.map((introduction) => (
            <div className="hero-content content-width" key={introduction.id}>
              <div className="section-header">
                <h4
                  className="subtitle scroll-animation"
                  data-animation="fade_from_bottom"
                >
                  <i className="las la-home"></i> Introduce
                </h4>
                <h1
                  className="scroll-animation"
                  data-animation="fade_from_bottom"
                >
                  {introduction.labelPrefix}{' '}
                  <span>{introduction.title}</span>
                </h1>
              </div>

              <p className="scroll-animation" data-animation="fade_from_bottom">
                {introduction.details}
              </p>

              <a
                href="#portfolio"
                className="go-to-project-btn scroll-to scroll-animation"
                data-animation="rotate_up"
              >
                <img src="/images/round-text.png" alt="Rounded text" />
                <i className="las la-arrow-down"></i>
              </a>

              <div className="facts d-flex">
                <div className="left scroll-animation" data-animation="fade_from_left">
                  <h1>{introduction.years}</h1>
                  <p>
                    Years of <br />
                    Experience
                  </p>
                </div>
                <div className="right scroll-animation" data-animation="fade_from_right">
                  <h1>{introduction.projects}</h1>
                  <p>projects completed</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Introduction;
