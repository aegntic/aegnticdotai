-- A per-submission key, not a visitor identifier. Legacy rows remain NULL.
ALTER TABLE messages ADD COLUMN submission_id TEXT;
ALTER TABLE messages ADD COLUMN payload_hash TEXT;
CREATE UNIQUE INDEX messages_submission_id ON messages (submission_id);
