import React, { useState, useRef, useEffect, CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { useDevTools } from './DevToolsContext';

type EditableElement = 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface StyleOptions {
    fontFamily?: 'sans' | 'serif' | 'mono';
    fontStyle?: 'normal' | 'italic';
    fontWeight?: 'normal' | 'bold' | 'light';
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    fontSize?: number;
}

interface EditableProps {
    id: string;
    children: ReactNode;
    className?: string;
    as?: EditableElement;
    resizable?: boolean;
    minWidth?: number;
    minHeight?: number;
}

const fontOptions = {
    sans: 'Inter, sans-serif',
    serif: 'Playfair Display, serif',
    mono: 'JetBrains Mono, monospace'
};

/**
 * Editable - Universal inline editing component
 * - Double-click to edit text
 * - Right-click (with edit mode) for style menu
 * - Drag corners to resize (when resizable=true)
 */
const Editable: React.FC<EditableProps> = ({
    id,
    children,
    className = '',
    as: Component = 'span',
    resizable = false,
    minWidth = 50,
    minHeight = 20
}) => {
    const { isDevMode, editMode, saveEdit, getEdit } = useDevTools();
    const [isEditing, setIsEditing] = useState(false);
    const [showStyleMenu, setShowStyleMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState<{ width?: number; height?: number }>({});
    const [styles, setStyles] = useState<StyleOptions>({});
    const [originalText, setOriginalText] = useState('');
    const contentRef = useRef<HTMLElement>(null);
    const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

    // Load saved values
    useEffect(() => {
        const savedText = getEdit(id);
        const savedSize = getEdit(id + '-size');
        const savedStyles = getEdit(id + '-styles');

        if (savedText && contentRef.current) {
            contentRef.current.textContent = savedText;
        }
        if (savedSize) {
            try {
                setSize(JSON.parse(savedSize));
            } catch (e) { }
        }
        if (savedStyles) {
            try {
                setStyles(JSON.parse(savedStyles));
            } catch (e) { }
        }
    }, [id, getEdit]);

    useEffect(() => {
        if (contentRef.current) {
            setOriginalText(contentRef.current.textContent || '');
        }
    }, [children]);

    // Close style menu on click outside
    useEffect(() => {
        if (!showStyleMenu) return;
        const handleClick = () => setShowStyleMenu(false);
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [showStyleMenu]);

    const handleDoubleClick = (e: React.MouseEvent) => {
        if (!editMode) return;
        e.stopPropagation();
        setIsEditing(true);
        setTimeout(() => {
            if (contentRef.current) {
                contentRef.current.focus();
                const selection = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(contentRef.current);
                selection?.removeAllRanges();
                selection?.addRange(range);
            }
        }, 0);
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        if (!editMode) return;
        e.preventDefault();
        e.stopPropagation();
        setMenuPosition({ x: e.clientX, y: e.clientY });
        setShowStyleMenu(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (contentRef.current) {
            const newText = contentRef.current.textContent || '';
            if (newText !== originalText) {
                saveEdit(id, 'text', newText, originalText);
                setOriginalText(newText);
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            contentRef.current?.blur();
        }
        if (e.key === 'Escape') {
            if (contentRef.current) {
                contentRef.current.textContent = originalText;
            }
            setIsEditing(false);
        }
    };

    const updateStyle = (key: keyof StyleOptions, value: string) => {
        const newStyles = { ...styles, [key]: value };
        setStyles(newStyles);
        saveEdit(id + '-styles', 'size', JSON.stringify(newStyles), '');
    };

    // Resize handlers
    const handleResizeStart = (e: React.MouseEvent) => {
        if (!editMode || !resizable) return;
        e.preventDefault();
        e.stopPropagation();

        const rect = contentRef.current?.getBoundingClientRect();
        if (!rect) return;

        startPos.current = {
            x: e.clientX,
            y: e.clientY,
            width: rect.width,
            height: rect.height
        };

        const handleMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - startPos.current.x;
            const dy = e.clientY - startPos.current.y;

            const newWidth = Math.max(minWidth, startPos.current.width + dx);
            const newHeight = Math.max(minHeight, startPos.current.height + dy);

            setSize({ width: newWidth, height: newHeight });
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            if (size.width || size.height) {
                saveEdit(id + '-size', 'size', JSON.stringify(size), '');
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    if (!isDevMode) {
        return React.createElement(Component, { className }, children);
    }

    // Build style object
    const styleFromOptions: CSSProperties = {
        fontFamily: styles.fontFamily ? fontOptions[styles.fontFamily] : undefined,
        fontStyle: styles.fontStyle,
        fontWeight: styles.fontWeight === 'light' ? 300 : styles.fontWeight === 'bold' ? 700 : styles.fontWeight === 'normal' ? 400 : undefined,
        textTransform: styles.textTransform,
        textAlign: styles.textAlign,
        fontSize: styles.fontSize ? `${styles.fontSize}px` : undefined
    };

    const editingStyle: CSSProperties = isEditing ? {
        outline: '2px solid #00f0ff',
        outlineOffset: '2px',
        borderRadius: '2px',
        cursor: 'text',
        minWidth: '20px',
        display: 'inline-block'
    } : {};

    const editModeStyle: CSSProperties = editMode && !isEditing ? {
        cursor: 'pointer',
        position: 'relative' as const
    } : {};

    const resizeStyle: CSSProperties = size.width || size.height ? {
        width: size.width ? `${size.width}px` : undefined,
        height: size.height ? `${size.height}px` : undefined,
        display: 'inline-block'
    } : {};

    return (
        <span style={{ position: 'relative', display: 'inline' }}>
            {React.createElement(
                Component,
                {
                    ref: contentRef as any,
                    className,
                    contentEditable: isEditing,
                    suppressContentEditableWarning: true,
                    onDoubleClick: handleDoubleClick,
                    onContextMenu: handleContextMenu,
                    onBlur: handleBlur,
                    onKeyDown: handleKeyDown,
                    style: { ...styleFromOptions, ...editModeStyle, ...editingStyle, ...resizeStyle },
                    title: editMode ? 'Double-click to edit • Right-click for styles' : undefined
                },
                children
            )}

            {/* Resize handle */}
            {editMode && resizable && !isEditing && (
                <div
                    onMouseDown={handleResizeStart}
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary cursor-se-resize rounded-sm opacity-0 hover:opacity-100 transition-opacity"
                    style={{
                        position: 'absolute',
                        bottom: '-4px',
                        right: '-4px'
                    }}
                />
            )}

            {/* Edit indicator */}
            {editMode && !isEditing && (
                <div
                    className="absolute w-1.5 h-1.5 bg-primary rounded-full opacity-40"
                    style={{
                        position: 'absolute',
                        top: '-2px',
                        left: '-2px'
                    }}
                />
            )}

            {/* Style Menu */}
            {showStyleMenu && (
                <div
                    className="fixed bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-[9999] p-3 space-y-3"
                    style={{ left: menuPosition.x, top: menuPosition.y }}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Quick Edit Button */}
                    <button
                        onClick={() => {
                            setShowStyleMenu(false);
                            setIsEditing(true);
                            setTimeout(() => {
                                if (contentRef.current) {
                                    contentRef.current.focus();
                                    const selection = window.getSelection();
                                    const range = document.createRange();
                                    range.selectNodeContents(contentRef.current);
                                    selection?.removeAllRanges();
                                    selection?.addRange(range);
                                }
                            }, 0);
                        }}
                        className="w-full px-3 py-2 bg-primary text-black font-bold text-xs uppercase tracking-wider rounded hover:bg-white transition-colors"
                    >
                        ✏️ Edit Text
                    </button>

                    <div className="border-t border-gray-700 pt-2">
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Text Style</div>
                    </div>

                    {/* Font Family */}
                    <div className="space-y-1">
                        <div className="text-[10px] text-gray-500 uppercase">Font</div>
                        <div className="flex gap-1">
                            {(['sans', 'serif', 'mono'] as const).map(font => (
                                <button
                                    key={font}
                                    onClick={() => updateStyle('fontFamily', font)}
                                    className={`px-2 py-1 text-xs rounded ${styles.fontFamily === font
                                        ? 'bg-primary text-black'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                    style={{ fontFamily: fontOptions[font] }}
                                >
                                    Aa
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Font Weight */}
                    <div className="space-y-1">
                        <div className="text-[10px] text-gray-500 uppercase">Weight</div>
                        <div className="flex gap-1">
                            {(['light', 'normal', 'bold'] as const).map(weight => (
                                <button
                                    key={weight}
                                    onClick={() => updateStyle('fontWeight', weight)}
                                    className={`px-2 py-1 text-xs rounded capitalize ${styles.fontWeight === weight
                                        ? 'bg-primary text-black'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                    style={{ fontWeight: weight === 'light' ? 300 : weight === 'bold' ? 700 : 400 }}
                                >
                                    {weight[0].toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Font Style */}
                    <div className="space-y-1">
                        <div className="text-[10px] text-gray-500 uppercase">Style</div>
                        <div className="flex gap-1">
                            <button
                                onClick={() => updateStyle('fontStyle', 'normal')}
                                className={`px-2 py-1 text-xs rounded ${styles.fontStyle !== 'italic'
                                    ? 'bg-primary text-black'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                Normal
                            </button>
                            <button
                                onClick={() => updateStyle('fontStyle', 'italic')}
                                className={`px-2 py-1 text-xs rounded italic ${styles.fontStyle === 'italic'
                                    ? 'bg-primary text-black'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                Italic
                            </button>
                        </div>
                    </div>

                    {/* Text Transform */}
                    <div className="space-y-1">
                        <div className="text-[10px] text-gray-500 uppercase">Case</div>
                        <div className="flex gap-1">
                            {(['none', 'uppercase', 'capitalize'] as const).map(transform => (
                                <button
                                    key={transform}
                                    onClick={() => updateStyle('textTransform', transform)}
                                    className={`px-2 py-1 text-xs rounded ${(styles.textTransform || 'none') === transform
                                        ? 'bg-primary text-black'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                    style={{ textTransform: transform }}
                                >
                                    {transform === 'none' ? 'Aa' : transform === 'uppercase' ? 'AA' : 'Aa'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Text Alignment */}
                    <div className="space-y-1">
                        <div className="text-[10px] text-gray-500 uppercase">Align</div>
                        <div className="flex gap-1">
                            {(['left', 'center', 'right', 'justify'] as const).map(align => (
                                <button
                                    key={align}
                                    onClick={() => updateStyle('textAlign', align)}
                                    className={`px-2 py-1 text-xs rounded ${(styles.textAlign || 'left') === align
                                        ? 'bg-primary text-black'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                >
                                    {align === 'left' ? '⫷' : align === 'center' ? '⫶' : align === 'right' ? '⫸' : '☰'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Font Size */}
                    <div className="space-y-1">
                        <div className="text-[10px] text-gray-500 uppercase">Size</div>
                        <div className="flex gap-1 items-center">
                            <button
                                onClick={() => updateStyle('fontSize', String(Math.max(8, (styles.fontSize || 16) - 2)))}
                                className="px-2 py-1 text-xs rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
                            >
                                -
                            </button>
                            <span className="text-xs text-white font-mono w-10 text-center">
                                {styles.fontSize || 'auto'}
                            </span>
                            <button
                                onClick={() => updateStyle('fontSize', String((styles.fontSize || 16) + 2))}
                                className="px-2 py-1 text-xs rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
                            >
                                +
                            </button>
                            <button
                                onClick={() => {
                                    const newStyles = { ...styles };
                                    delete newStyles.fontSize;
                                    setStyles(newStyles);
                                    saveEdit(id + '-styles', 'size', JSON.stringify(newStyles), '');
                                }}
                                className="px-2 py-1 text-[10px] rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-2 text-[10px] text-gray-600">
                        Right-click = styles • Double-click = edit
                    </div>
                </div>
            )}
        </span>
    );
};

export default Editable;
