-- Migration number: 0001 	 2024-02-17T00:00:00.000Z
CREATE TABLE IF NOT EXISTS subscribers (
    email TEXT PRIMARY KEY,
    source TEXT,
    status TEXT DEFAULT 'active',
    created_at INTEGER DEFAULT (strftime('%s', 'now'))
);
