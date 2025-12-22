import React, { useState, useRef, useEffect, CSSProperties, KeyboardEvent } from 'react';

type EditableElement = 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface EditableTextProps {
    children: React.ReactNode;
    className?: string;
    as?: EditableElement;
    onSave?: (newText: string) => void;
}

// Check if we're in dev mode
const isDev = typeof import.meta !== 'undefined' && (import.meta as any).env?.DEV;

/**
 * EditableText - Dev-mode inline editing component
 * Double-click any text to edit it directly in the browser.
 * Changes are logged to console (add persistence as needed).
 */
const EditableText: React.FC<EditableTextProps> = ({
    children,
    className = '',
    as: Component = 'span',
    onSave
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [originalText, setOriginalText] = useState('');
    const contentRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            setOriginalText(contentRef.current.textContent || '');
        }
    }, [children]);

    const handleDoubleClick = () => {
        if (isDev) {
            setIsEditing(true);
            // Focus and select all text
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
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (contentRef.current) {
            const newText = contentRef.current.textContent || '';
            if (newText !== originalText) {
                console.log('[EditableText] Changed:', { from: originalText, to: newText });
                setOriginalText(newText);
                onSave?.(newText);
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

    const editingStyle: CSSProperties = isEditing ? {
        outline: '2px solid #00f0ff',
        outlineOffset: '4px',
        borderRadius: '4px',
        cursor: 'text',
        minWidth: '20px',
        display: 'inline-block'
    } : {};

    const hoverStyle: CSSProperties = isDev && !isEditing ? {
        cursor: 'pointer'
    } : {};

    // Create element with proper typing
    const element = React.createElement(
        Component,
        {
            ref: contentRef as any,
            className,
            contentEditable: isDev ? isEditing : undefined,
            suppressContentEditableWarning: true,
            onDoubleClick: isDev ? handleDoubleClick : undefined,
            onBlur: isDev ? handleBlur : undefined,
            onKeyDown: isDev ? handleKeyDown : undefined,
            style: { ...editingStyle, ...hoverStyle },
            title: isDev ? 'Double-click to edit' : undefined
        },
        children
    );

    return element;
};

export default EditableText;
