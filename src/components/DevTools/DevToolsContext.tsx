import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface EditedElement {
    id: string;
    type: 'text' | 'icon' | 'size';
    value: string;
    originalValue: string;
}

interface DevToolsContextType {
    isDevMode: boolean;
    editMode: boolean;
    setEditMode: (mode: boolean) => void;
    edits: Record<string, EditedElement>;
    saveEdit: (id: string, type: EditedElement['type'], value: string, originalValue: string) => void;
    getEdit: (id: string) => string | undefined;
    clearEdits: () => void;
    exportEdits: () => string;
}

const DevToolsContext = createContext<DevToolsContextType | null>(null);

const STORAGE_KEY = 'aegntic-dev-edits';

export const DevToolsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const isDevMode = typeof import.meta !== 'undefined' && (import.meta as any).env?.DEV;
    const [editMode, setEditMode] = useState(false);
    const [edits, setEdits] = useState<Record<string, EditedElement>>({});

    // Load saved edits from localStorage
    useEffect(() => {
        if (isDevMode) {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    setEdits(JSON.parse(saved));
                    console.log('[DevTools] Loaded saved edits:', JSON.parse(saved));
                }
            } catch (e) {
                console.error('[DevTools] Failed to load edits:', e);
            }
        }
    }, [isDevMode]);

    // Save edits to localStorage
    useEffect(() => {
        if (isDevMode && Object.keys(edits).length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(edits));
        }
    }, [edits, isDevMode]);

    // Keyboard shortcut: Ctrl+Shift+E to toggle edit mode
    useEffect(() => {
        if (!isDevMode) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'E') {
                e.preventDefault();
                setEditMode(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isDevMode]);

    const saveEdit = (id: string, type: EditedElement['type'], value: string, originalValue: string) => {
        setEdits(prev => ({
            ...prev,
            [id]: { id, type, value, originalValue }
        }));
        console.log(`[DevTools] Saved ${type}:`, { id, value });
    };

    const getEdit = (id: string): string | undefined => {
        return edits[id]?.value;
    };

    const clearEdits = () => {
        setEdits({});
        localStorage.removeItem(STORAGE_KEY);
        console.log('[DevTools] Cleared all edits');
    };

    const exportEdits = (): string => {
        return JSON.stringify(edits, null, 2);
    };

    return (
        <DevToolsContext.Provider value={{
            isDevMode,
            editMode,
            setEditMode,
            edits,
            saveEdit,
            getEdit,
            clearEdits,
            exportEdits
        }}>
            {children}
            {isDevMode && <DevToolsPanel />}
        </DevToolsContext.Provider>
    );
};

export const useDevTools = () => {
    const context = useContext(DevToolsContext);
    if (!context) {
        return {
            isDevMode: false,
            editMode: false,
            setEditMode: () => { },
            edits: {},
            saveEdit: () => { },
            getEdit: () => undefined,
            clearEdits: () => { },
            exportEdits: () => '{}'
        };
    }
    return context;
};

// Floating dev tools toolbar - fixed at top center
const DevToolsPanel: React.FC = () => {
    const { editMode, setEditMode, edits, clearEdits, exportEdits } = useDevTools();
    const editCount = Object.keys(edits).length;

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] font-sans">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-full shadow-2xl">
                {/* Edit Mode Toggle */}
                <button
                    onClick={() => setEditMode(!editMode)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${editMode
                        ? 'bg-primary text-black shadow-[0_0_15px_rgba(0,240,255,0.5)]'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    title="Toggle Edit Mode (Ctrl+Shift+E)"
                >
                    <svg width="14\" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    {editMode ? 'Editing' : 'Edit Mode'}
                </button>

                {/* Divider */}
                <div className="w-px h-6 bg-gray-700" />

                {/* Instructions when edit mode is on */}
                {editMode && (
                    <>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                            Double-click = edit • Right-click = style
                        </span>
                        <div className="w-px h-6 bg-gray-700" />
                    </>
                )}

                {/* Edits counter */}
                {editCount > 0 && (
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-primary font-mono">
                            {editCount} edit{editCount !== 1 ? 's' : ''}
                        </span>

                        {/* Export button */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                const data = exportEdits();
                                navigator.clipboard.writeText(data).then(() => {
                                    alert('Edits copied to clipboard!');
                                }).catch(err => {
                                    console.error('Failed to copy:', err);
                                    // Fallback: show in console
                                    console.log('Edits:', data);
                                    alert('Edits logged to console (clipboard failed)');
                                });
                            }}
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-[10px] uppercase tracking-wider rounded-full transition-colors pointer-events-auto cursor-pointer"
                            title="Export edits to clipboard"
                        >
                            Export
                        </button>

                        {/* Clear button */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (confirm('Clear all edits?')) {
                                    clearEdits();
                                    window.location.reload();
                                }
                            }}
                            className="px-3 py-1 bg-red-900/50 hover:bg-red-800 text-red-300 text-[10px] uppercase tracking-wider rounded-full transition-colors pointer-events-auto cursor-pointer"
                            title="Clear all edits"
                        >
                            Clear
                        </button>
                    </div>
                )}

                {/* Keyboard shortcut hint when not editing */}
                {!editMode && editCount === 0 && (
                    <span className="text-[10px] text-gray-500">
                        <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-[9px]">Ctrl</kbd>+
                        <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-[9px]">Shift</kbd>+
                        <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-[9px]">E</kbd>
                    </span>
                )}
            </div>
        </div>
    );
};

export default DevToolsProvider;
