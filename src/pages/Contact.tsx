import Icon3D from '../components/Icon3D';
import ScrollReveal from '../components/ScrollReveal';
import { Editable, EditableIcon } from '../components/DevTools';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
    const contactMethods = [
        { type: 'Email', value: 'contact@aegntic.ai', label: 'General Inquiries', icon: 'Mail' },
        { type: 'Twitter', value: '@aegntic_ai', label: 'Latest Updates', icon: 'Twitter' },
        { type: 'LinkedIn', value: '/company/aegntic', label: 'Company News', icon: 'Linkedin' },
        { type: 'GitHub', value: '/aegntic', label: 'Open Source', icon: 'Github' }
    ];

    const officeLocations = [
        { city: 'San Francisco', country: 'United States', focus: 'Headquarters' },
        { city: 'Zurich', country: 'Switzerland', focus: 'Research Lab' },
        { city: 'Singapore', country: 'Singapore', focus: 'Asia Pacific' },
        { city: 'London', country: 'United Kingdom', focus: 'European Operations' }
    ];

    return (
        <div className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Page Header - Right-justified Main Heading */}
                <div className="text-right mb-24">
                    <ScrollReveal>
                        <div className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] mb-4">
                            <Editable id="contact-subtitle" as="span">aegntic.network</Editable>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                            <Editable id="contact-heading-1" as="span">Connect with</Editable>{' '}
                            <span className="text-primary">
                                <Editable id="contact-heading-2" as="span">Aegntic</Editable>
                            </span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={400}>
                        <p className="max-w-3xl ml-auto text-gray-400 text-lg leading-relaxed">
                            <Editable id="contact-description" as="span">
                                Whether you're interested in research partnerships, career opportunities, or exploring our technology stack, we'd love to hear from you.
                            </Editable>
                        </p>
                    </ScrollReveal>
                </div>

                {/* Main Contact Section - Asymmetrical Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
                    {/* Left-aligned Contact Form */}
                    <ScrollReveal>
                        <div className="text-left">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">
                                <Editable id="contact-form-heading" as="span">Send us a</Editable>{' '}
                                <span className="text-primary italic font-serif">
                                    <Editable id="contact-form-heading-2" as="span">message</Editable>
                                </span>
                            </h2>
                            <p className="text-gray-400 mb-8">
                                <Editable id="contact-form-desc" as="span">
                                    Fill out the form below and our team will get back to you within 24-48 hours.
                                </Editable>
                            </p>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">
                                            <Editable id="contact-form-name-label" as="span">Name</Editable>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full bg-surface-dark/60 border border-white/10 rounded-lg px-6 py-4 text-sm focus:border-primary/50 transition-colors outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">
                                            <Editable id="contact-form-email-label" as="span">Email</Editable>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="w-full bg-surface-dark/60 border border-white/10 rounded-lg px-6 py-4 text-sm focus:border-primary/50 transition-colors outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">
                                        <Editable id="contact-form-subject-label" as="span">Subject</Editable>
                                    </label>
                                    <select className="w-full bg-surface-dark/60 border border-white/10 rounded-lg px-6 py-4 text-sm focus:border-primary/50 transition-colors outline-none">
                                        <option>General Inquiry</option>
                                        <option>Research Partnership</option>
                                        <option>Career Opportunity</option>
                                        <option>Press/Media</option>
                                        <option>Technical Support</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">
                                        <Editable id="contact-form-message-label" as="span">Message</Editable>
                                    </label>
                                    <textarea
                                        rows={6}
                                        placeholder="Tell us more..."
                                        className="w-full bg-surface-dark/60 border border-white/10 rounded-lg px-6 py-4 text-sm focus:border-primary/50 transition-colors outline-none resize-none"
                                    />
                                </div>
                                <button type="submit" className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-black font-bold uppercase text-xs tracking-widest rounded-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                                    <Icon3D icon="Send" size={16} />
                                    <Editable id="contact-form-submit" as="span">Send Message</Editable>
                                </button>
                            </form>
                        </div>
                    </ScrollReveal>

                    {/* Right-aligned Contact Methods */}
                    <ScrollReveal delay={200}>
                        <div className="text-right">
                            <h3 className="text-2xl font-bold mb-8 tracking-tight">
                                <Editable id="contact-methods-heading" as="span">Quick</Editable>{' '}
                                <span className="text-primary italic font-serif">
                                    <Editable id="contact-methods-heading-2" as="span">Connections</Editable>
                                </span>
                            </h3>
                            <div className="space-y-6">
                                {contactMethods.map((method, idx) => (
                                    <div key={idx} className="group p-6 rounded-2xl bg-surface-dark/40 border border-white/5 hover:border-primary/30 transition-all duration-500 cursor-pointer">
                                        <div className="flex items-center justify-end gap-4">
                                            <div className="text-right flex-grow">
                                                <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{method.label}</div>
                                                <div className="text-white font-mono group-hover:text-primary transition-colors">{method.value}</div>
                                            </div>
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                                <EditableIcon id={`contact-method-${idx}-icon`} icon={method.icon as any} size={20} className="text-primary" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Global Offices Section - Asymmetrical Layout */}
                <div className="rounded-3xl bg-background-dark border border-white/5 overflow-hidden relative mb-32">
                    <div className="absolute inset-0 bg-tech-grid opacity-10" />
                    <div className="relative z-10 p-12 lg:p-20">
                        {/* Right-aligned Section Heading */}
                        <div className="text-right mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                                <Editable id="contact-offices-heading" as="span">Global</Editable>{' '}
                                <span className="text-primary italic font-serif">
                                    <Editable id="contact-offices-heading-2" as="span">Presence</Editable>
                                </span>
                            </h2>
                            <p className="text-gray-400">
                                <Editable id="contact-offices-desc" as="span">
                                    Our distributed team spans four time zones, ensuring round-the-clock innovation and support.
                                </Editable>
                            </p>
                        </div>

                        {/* Left-aligned Office Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                            {officeLocations.map((office, idx) => (
                                <ScrollReveal key={idx} delay={idx * 100}>
                                    <div className="group p-8 rounded-2xl bg-surface-dark/40 border border-white/5 hover:border-primary/30 transition-all duration-500">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 group-hover:bg-primary/20 transition-colors">
                                            <Icon3D icon="MapPin" className="text-primary" size={20} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                                            {office.city}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-4">{office.country}</p>
                                        <div className="text-[10px] uppercase tracking-widest text-primary/80 font-bold">
                                            {office.focus}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Media Inquiries - Asymmetrical */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ScrollReveal>
                        <div className="h-full p-12 rounded-3xl bg-primary/5 border border-primary/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                            <h2 className="text-3xl font-bold mb-6 relative z-10 tracking-tight text-left">
                                <span className="font-serif">
                                    <Editable id="contact-press-title-1" as="span">Press &</Editable>
                                </span>{' '}
                                <span className="text-primary">
                                    <Editable id="contact-press-title-2" as="span">Media</Editable>
                                </span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-8 relative z-10 text-left">
                                <Editable id="contact-press-desc" as="span">
                                    For press inquiries, interview requests, or media resources, please reach out to our communications team directly.
                                </Editable>
                            </p>
                            <button className="flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] font-bold group/btn relative z-10">
                                <Editable id="contact-press-cta" as="span">press@aegntic.ai</Editable>
                                <Icon3D icon="ArrowRight" size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="h-full p-12 rounded-3xl bg-surface-dark/40 border border-white/5 relative overflow-hidden group">
                            <h2 className="text-3xl font-bold mb-6 relative z-10 tracking-tight text-left">
                                <span className="font-serif">
                                    <Editable id="contact-careers-title-1" as="span">Join the</Editable>
                                </span>{' '}
                                <span className="text-primary italic font-serif">
                                    <Editable id="contact-careers-title-2" as="span">Collective</Editable>
                                </span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-8 relative z-10 text-left">
                                <Editable id="contact-careers-desc" as="span">
                                    We're always looking for exceptional researchers, engineers, and visionaries to help build the future of synthetic intelligence.
                                </Editable>
                            </p>
                            <button className="flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] font-bold group/btn relative z-10">
                                <Editable id="contact-careers-cta" as="span">View Open Positions</Editable>
                                <Icon3D icon="ArrowRight" size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default Contact;
