CREATE DATABASE IF NOT EXISTS pos_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Check if the user exists, and if not, create the user and grant privileges
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT SELECT, INSERT, UPDATE, DELETE ON pos_system.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
