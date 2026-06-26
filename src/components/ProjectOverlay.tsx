import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectOverlayProps {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectOverlay: React.FC<ProjectOverlayProps> = ({ project, isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[90] flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(26, 26, 24, 0.3)', backdropFilter: 'blur(12px)' }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                        className="relative w-full h-full overflow-y-auto"
                        style={{ backgroundColor: 'var(--color-bg-elevated)' }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-12 py-6" style={{ backgroundColor: 'rgba(255,255,255,0.92)', borderBottom: '1px solid var(--color-rule)' }}>
                            <button onClick={onClose} className="flex items-center gap-2 nav-link">
                                <ArrowLeft size={14} />
                                Back
                            </button>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-6 md:px-12 py-12 md:py-20 max-w-4xl mx-auto">
                            {/* Preview */}
                            <div className="overflow-hidden mb-12" style={{
                                border: '1px solid var(--color-rule)',
                                borderRadius: 'var(--radius-lg)',
                                aspectRatio: '16/10',
                                background: 'var(--color-bg-elevated)',
                            }}>
                                <img
                                    src={project.preview}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    style={{ opacity: 0.8 }}
                                    loading="lazy"
                                />
                            </div>

                            {/* Title */}
                            <h1 style={{
                                fontFamily: 'var(--font-family-display)',
                                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                                marginBottom: '1rem',
                            }}>
                                {project.title}
                            </h1>

                            {/* Tagline */}
                            <p style={{
                                fontFamily: 'var(--font-family-display)',
                                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                                lineHeight: 1.3,
                                color: 'var(--color-text-secondary)',
                                marginBottom: '2.5rem',
                                maxWidth: '40ch',
                            }}>
                                {project.tagline}
                            </p>

                            {/* Description */}
                            <p style={{
                                fontSize: '0.9rem',
                                lineHeight: 1.7,
                                color: 'var(--color-text-secondary)',
                                maxWidth: '52ch',
                                marginBottom: '3rem',
                            }}>
                                {project.description}
                            </p>

                            {/* CTA */}
                            <a
                                href={project.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                Visit site <ExternalLink size={14} />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectOverlay;
