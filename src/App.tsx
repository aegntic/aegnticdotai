import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import Home from './pages/Home';
import About from './pages/About';
import Featured from './pages/Featured';
import Projects from './pages/Projects';
import Research from './pages/Research';
import Contact from './pages/Contact';

const App: React.FC = () => {
    return (
        <div className="relative min-h-screen flex flex-col w-full overflow-hidden bg-deep-space">
            <CursorGlow />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    {/* Hero — aegntic.ai */}
                    <section id="home">
                        <Home />
                    </section>

                    {/* About — aegntic.foundation */}
                    <section id="about">
                        <About />
                    </section>

                    {/* Featured — aegntic.update */}
                    <section id="featured">
                        <Featured />
                    </section>

                    {/* Projects — aegntic.development */}
                    <section id="projects">
                        <Projects />
                    </section>

                    {/* Research — aegntic.research */}
                    <section id="research">
                        <Research />
                    </section>

                    {/* Contact — aegntic.network */}
                    <section id="contact">
                        <Contact />
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default App;
