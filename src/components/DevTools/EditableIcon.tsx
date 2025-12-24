import React, { useState, useRef, useEffect } from 'react';
import { useDevTools } from './DevToolsContext';
import * as LucideIcons from 'lucide-react';
import Icon3D from '../Icon3D';

// Get all icon names from lucide-react
const iconNames = Object.keys(LucideIcons).filter(
    key => key !== 'default' &&
        key !== 'createLucideIcon' &&
        typeof (LucideIcons as any)[key] === 'function' &&
        key[0] === key[0].toUpperCase()
);

interface EditableIconProps {
    id: string;
    icon: string;
    size?: number;
    className?: string;
    resizable?: boolean;
}

/**
 * EditableIcon - Click to change icon, resize with drag
 */
const EditableIcon: React.FC<EditableIconProps> = ({
    id,
    icon: defaultIcon,
    size: defaultSize = 24,
    className = '',
    resizable = true
}) => {
    const { isDevMode, editMode, saveEdit, getEdit } = useDevTools();
    const [showPicker, setShowPicker] = useState(false);
    const [search, setSearch] = useState('');
    const [currentIcon, setCurrentIcon] = useState(defaultIcon);
    const [currentSize, setCurrentSize] = useState(defaultSize);
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const startPos = useRef({ x: 0, size: 0 });

    // Load saved icon and size
    useEffect(() => {
        const savedIcon = getEdit(id);
        const savedSize = getEdit(id + '-size');

        if (savedIcon) {
            setCurrentIcon(savedIcon);
        }
        if (savedSize) {
            setCurrentSize(parseInt(savedSize) || defaultSize);
        }
    }, [id, getEdit, defaultSize]);

    const handleClick = (e: React.MouseEvent) => {
        if (!editMode) return;
        e.stopPropagation();
        setShowPicker(true);
    };

    const selectIcon = (iconName: string) => {
        setCurrentIcon(iconName);
        saveEdit(id, 'icon', iconName, defaultIcon);
        setShowPicker(false);
    };

    // Resize handler
    const handleResizeStart = (e: React.MouseEvent) => {
        if (!editMode || !resizable) return;
        e.preventDefault();
        e.stopPropagation();

        startPos.current = {
            x: e.clientX,
            size: currentSize
        };

        setIsResizing(true);

        const handleMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - startPos.current.x;
            const newSize = Math.max(12, Math.min(200, startPos.current.size + dx));
            setCurrentSize(newSize);
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            saveEdit(id + '-size', 'size', currentSize.toString(), defaultSize.toString());
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // Filter icons
    const filteredIcons = search
        ? iconNames.filter(name => name.toLowerCase().includes(search.toLowerCase())).slice(0, 50)
        : iconNames.slice(0, 50);

    // Get the icon component
    const IconComponent = (LucideIcons as any)[currentIcon] || LucideIcons.HelpCircle;

    if (!isDevMode) {
        return <Icon3D icon={currentIcon} size={defaultSize} className={className} />;
    }

    return (
        <div
            ref={containerRef}
            style={{ position: 'relative', display: 'inline-flex' }}
        >
            <div
                onClick={handleClick}
                style={{
                    cursor: editMode ? 'pointer' : 'default',
                    position: 'relative'
                }}
                title={editMode ? 'Click to change icon' : undefined}
            >
                {editMode ? (
                    <IconComponent size={currentSize} className={className} />
                ) : (
                    <Icon3D icon={currentIcon} size={currentSize} className={className} />
                )}

                {/* Edit indicator */}
                {editMode && (
                    <div
                        className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full opacity-50"
                        style={{
                            position: 'absolute',
                            top: '-4px',
                            left: '-4px'
                        }}
                    />
                )}
            </div>

            {/* Resize handle */}
            {editMode && resizable && (
                <div
                    onMouseDown={handleResizeStart}
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 cursor-se-resize rounded-sm opacity-50 hover:opacity-100 transition-opacity"
                    style={{
                        position: 'absolute',
                        bottom: '-4px',
                        right: '-4px'
                    }}
                />
            )}

            {/* Icon Picker Modal */}
            {showPicker && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-[9998]"
                        onClick={() => setShowPicker(false)}
                    />
                    <div
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 max-h-[80vh] bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-[9999] overflow-hidden"
                    >
                        <div className="p-4 border-b border-gray-700">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-white font-bold">Select Icon</span>
                                <button
                                    onClick={() => setShowPicker(false)}
                                    className="text-gray-400 hover:text-white text-xl"
                                >
                                    ×
                                </button>
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search icons..."
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                                autoFocus
                            />
                        </div>
                        <div className="p-4 max-h-[50vh] overflow-y-auto">
                            <div className="grid grid-cols-6 gap-2">
                                {filteredIcons.map(iconName => {
                                    const Icon = (LucideIcons as any)[iconName];
                                    return (
                                        <button
                                            key={iconName}
                                            onClick={() => selectIcon(iconName)}
                                            className={`p-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center ${currentIcon === iconName ? 'bg-primary/20 ring-1 ring-primary' : ''
                                                }`}
                                            title={iconName}
                                        >
                                            <Icon size={20} className="text-gray-300" />
                                        </button>
                                    );
                                })}
                            </div>
                            {filteredIcons.length === 0 && (
                                <div className="text-center text-gray-500 py-4">
                                    No icons found
                                </div>
                            )}
                        </div>
                        <div className="p-3 border-t border-gray-700 text-xs text-gray-500 text-center">
                            Current: {currentIcon} • Size: {currentSize}px
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default EditableIcon;
