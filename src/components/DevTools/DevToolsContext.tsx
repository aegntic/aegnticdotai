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

// Floating dev tools panel
const DevToolsPanel: React.FC = () => {
    const { editMode, setEditMode, edits, clearEdits, exportEdits } = useDevTools();
    const [isOpen, setIsOpen] = useState(false);
    const editCount = Object.keys(edits).length;

    return (
        <div className="fixed bottom-4 right-4 z-[9999] font-sans">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${editMode ? 'bg-primary text-black' : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                title="Dev Tools (Ctrl+Shift+E)"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                {editCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {editCount}
                    </span>
                )}
            </button>

            {/* Panel */}
            {isOpen && (
                <div className="absolute bottom-14 right-0 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
                    <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                        <span className="text-white font-bold text-sm">Dev Tools</span>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">×</button>
                    </div>

                    <div className="p-3 space-y-3">
                        {/* Edit Mode Toggle */}
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">Edit Mode</span>
                            <button
                                onClick={() => setEditMode(!editMode)}
                                className={`w-12 h-6 rounded-full transition-colors relative ${editMode ? 'bg-primary' : 'bg-gray-600'
                                    }`}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${editMode ? 'left-7' : 'left-1'
                                    }`} />
                            </button>
                        </div>

                        {/* Shortcut hint */}
                        <div className="text-xs text-gray-500">
                            Shortcut: <kbd className="px-1 py-0.5 bg-gray-700 rounded">Ctrl</kbd>+<kbd className="px-1 py-0.5 bg-gray-700 rounded">Shift</kbd>+<kbd className="px-1 py-0.5 bg-gray-700 rounded">E</kbd>
                        </div>

                        {/* Edits count */}
                        {editCount > 0 && (
                            <div className="text-xs text-gray-400">
                                {editCount} unsaved edit{editCount !== 1 ? 's' : ''}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    console.log('[DevTools] Exported edits:', exportEdits());
                                    navigator.clipboard.writeText(exportEdits());
                                    alert('Edits copied to clipboard!');
                                }}
                                className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors"
                            >
                                Export
                            </button>
                            <button
                                onClick={() => {
                                    if (confirm('Clear all edits?')) {
                                        clearEdits();
                                        window.location.reload();
                                    }
                                }}
                                className="flex-1 px-3 py-1.5 bg-red-900/50 hover:bg-red-800 text-red-300 text-xs rounded transition-colors"
                            >
                                Clear
                            </button>
                        </div>

                        {/* Instructions */}
                        <div className="text-xs text-gray-500 border-t border-gray-700 pt-3 space-y-1">
                            <div>• Double-click text to edit</div>
                            <div>• Click icons to change</div>
                            <div>• Drag corners to resize</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DevToolsProvider;
