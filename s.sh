CREATE USER reading_user WITH PASSWORD 'reading_pass';
GRANT CONNECT ON DATABASE linked_in_clone TO reading_user;
\connect linked_in_clone
GRANT SELECT ON ALL TABLES IN SCHEMA public TO reading_user;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO reading_user;
GRANT USAGE ON SCHEMA public TO reading_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO reading_user;