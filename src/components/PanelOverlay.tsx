import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PanelOverlayProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const PanelOverlay: React.FC<PanelOverlayProps> = ({ title, isOpen, onClose, children }) => {
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
                        style={{ backgroundColor: '#faf9f6' }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-12 py-6" style={{ backgroundColor: 'rgba(250,249,246,0.95)', borderBottom: '1px solid #ddd9d0' }}>
                            <span className="text-label">{title}</span>
                            <button onClick={onClose} className="hover:opacity-60 transition-opacity" style={{ color: 'var(--color-text-tertiary)' }}>
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-6 md:px-12 py-12 md:py-20 max-w-4xl mx-auto">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PanelOverlay;
