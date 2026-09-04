-- Additive only. Existing enquiries keep their content and have no inferred service.
ALTER TABLE messages ADD COLUMN service TEXT;
ALTER TABLE messages ADD COLUMN source_path TEXT;
ALTER TABLE messages ADD COLUMN system_url TEXT;
ALTER TABLE messages ADD COLUMN offer_key TEXT;
ALTER TABLE messages ADD COLUMN status TEXT NOT NULL DEFAULT 'new';
ALTER TABLE messages ADD COLUMN notification_status TEXT NOT NULL DEFAULT 'not_requested'
    CHECK (notification_status IN ('not_requested', 'pending', 'queued', 'sent', 'failed'));

CREATE INDEX messages_notification_status_created_at ON messages (notification_status, created_at);
