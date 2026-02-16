import React from 'react';
import {
    Network,
    ArrowRight,
    ArrowLeft,
    ChevronDown,
    ChevronRight,
    ChevronLeft,
    ChevronUp,
    Home,
    Info,
    Laptop,
    Package,
    GitFork,
    Fingerprint,
    Lock,
    Clock,
    Calendar,
    Tag,
    BookOpen,
    Github,
    Linkedin,
    Twitter,
    Mail,
    MapPin,
    Send,
    Globe,
    X,
    Users,
    Bookmark,
    Share2,
    Shield,
    Target,
    AlertCircle,
    Download,
    Database,
    Cpu,
    Eye,
    FileText,
    Zap,
    Activity,
    Server,
    Settings,
    Search,
    Menu,
    ExternalLink,
    type LucideIcon
} from 'lucide-react';

interface Icon3DProps {
    icon: string;
    size?: number;
    className?: string;
}

// Map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
    Network,
    ArrowRight,
    ArrowLeft,
    ChevronDown,
    ChevronRight,
    ChevronLeft,
    ChevronUp,
    Home,
    Info,
    About: Info,
    Laptop,
    Package,
    GitFork,
    Fingerprint,
    Lock,
    Clock,
    Calendar,
    Tag,
    BookOpen,
    Github,
    GitHub: Github,
    Linkedin,
    LinkedIn: Linkedin,
    Twitter,
    Mail,
    MapPin,
    Send,
    Globe,
    X,
    Close: X,
    Users,
    Bookmark,
    Share2,
    Shield,
    Target,
    AlertCircle,
    Download,
    Database,
    Cpu,
    Eye,
    FileText,
    Zap,
    Activity,
    Server,
    Settings,
    Search,
    Menu,
    ExternalLink,
};

/**
 * Icon3D - Renders Lucide icons with 3D depth styling.
 * Replaces the old PNG-based system with SVG icons.
 */
const Icon3D: React.FC<Icon3DProps> = ({ icon, size = 24, className = '' }) => {
    const IconComponent = iconMap[icon];

    if (!IconComponent) {
        console.warn(`Icon3D: Unknown icon "${icon}"`);
        return (
            <span
                className={`inline-block ${className}`}
                style={{ width: size, height: size }}
            />
        );
    }

    return (
        <IconComponent
            size={size}
            className={`icon-3d ${className}`}
            style={{
                filter: 'drop-shadow(0 2px 4px rgba(0, 240, 255, 0.2)) drop-shadow(0 0 8px rgba(0, 240, 255, 0.1))',
            }}
        />
    );
};

export default Icon3D;
