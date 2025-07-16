import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import Testimonial from './pages/Testimonial';
import Price from './pages/Price';
import Contact from './pages/Contact';
import Layout from './components/Layout';
import Home from './pages/Home';

function App() {
  return (
    <div>

      <body class="home1-page">

<GlobalColor />

<SidebarMenu />


      <MenuNav />

      <LeftSidebar />

{/* <Home /> */}

<main class="drake-main">
        <div id="smooth-wrapper">
            <div id="smooth-content">

<Sidebar />

<Introduction />

<About />

<Education />

<Specialization />

<Skills />

<Project />

{/* <Testimonial /> */}

{/* <Price /> */}

          <Contact />

          </div>
          </div>
          </main>

</body>
        
    </div>
  );
}

export default App;
