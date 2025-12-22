import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Research from './pages/Research';
import Projects from './pages/Projects';
import Collaborations from './pages/Collaborations';
import ArticleView from './pages/ArticleView';

const App: React.FC = () => {
    const location = useLocation();

    return (
        <div className="relative min-h-screen flex flex-col w-full overflow-hidden bg-background-dark">
            {/* Background Noise Overlay */}
            <div
                className="fixed inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none z-0"
                aria-hidden="true"
            />

            {/* Ambient Background Glows */}
            <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/research" element={<Research />} />
                            <Route path="/research/:id" element={<ArticleView />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/colabs" element={<Collaborations />} />
                        </Routes>
                    </AnimatePresence>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default App;
