import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Research from './pages/Research';
import Projects from './pages/Projects';
import Collaborations from './pages/Collaborations';

const App: React.FC = () => {
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
                    {/* Hero Section */}
                    <section id="home">
                        <Home />
                    </section>

                    {/* About Section */}
                    <section id="about">
                        <About />
                    </section>

                    {/* Ecosystem/Projects Section */}
                    <section id="ecosystem">
                        <Projects />
                    </section>

                    {/* Research Section */}
                    <section id="research">
                        <Research />
                    </section>

                    {/* Contact Section */}
                    <section id="contact">
                        <Collaborations />
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default App;
