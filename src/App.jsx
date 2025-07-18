import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GlobalColor from './components/GlobalColor';
import SidebarMenu from './components/SidebarMenu';
import MenuNav from './components/MenuNav';
import LeftSidebar from './components/LeftSidebar';
import Sidebar from './components/Sidebar';

import Introduction from './pages/Introduction';
import About from './pages/About';
import Education from './pages/Education';
import Specialization from './pages/Specialization';
import Skills from './pages/Skills';
import Project from './pages/Project';
// import Testimonial from './pages/Testimonial';
// import Price from './pages/Price';
import Contact from './pages/Contact';
import ImageResize from './pages/ImageResize';

function App() {
  return (
    <Router>
      <div className="home1-page">
        <GlobalColor />
        <SidebarMenu />
        <MenuNav />
        <LeftSidebar />

        <main className="drake-main">
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <Sidebar />

              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Introduction />
                      <About />
                      <Education />
                      <Specialization />
                      <Skills />
                      <Project />
                      {/* <Testimonial /> */}
                      {/* <Price /> */}
                      <Contact />
                    </>
                  }
                />
                <Route path="/imageresize" element={<ImageResize />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
